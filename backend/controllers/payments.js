const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const querystring = require('querystring');

const mailSender = require('../utils/mailSender');
const { createVNPayPaymentUrl } = require('../config/vnpay');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');

const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require('../models/courseProgress');

// Initialize dotenv
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Routes
app.post('/create-payment', createPayment);
app.get('/vnpay-return', handleVNPayReturn);
app.post('/capture-payment', capturePayment);
app.post('/verify-payment', verifyPayment);
app.post('/send-payment-success-email', sendPaymentSuccessEmail);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/**
 * Create Payment: Generates VNPay payment URL.
 */
async function createPayment(req, res) {
  // Your payment creation logic here, similar to the capturePayment function
  const { coursesId } = req.body;
  const userId = req.user.id;

  if (!coursesId || coursesId.length === 0) {
    return res.status(400).json({ success: false, message: 'Please provide Course IDs' });
  }

  try {
    let totalAmount = 0;
    const selectedCourses = [];

    // Calculate total amount
    for (const courseId of coursesId) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, message: `Course not found: ${courseId}` });
      }
      if (course.studentsEnrolled.includes(userId)) {
        return res.status(400).json({ success: false, message: `Already enrolled in course: ${course.courseName}` });
      }
      totalAmount += course.price;
      selectedCourses.push(course.courseName);
    }

    // Create order ID and info
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const orderInfo = `Payment for courses: ${selectedCourses.join(', ')}`;

    // Create VNPay payment URL
    const paymentUrl = createVNPayPaymentUrl(orderId, totalAmount, orderInfo);

    res.status(200).json({
      success: true,
      paymentUrl: paymentUrl,
      orderId: orderId,
      amount: totalAmount,
      courses: coursesId
    });

  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Could not initiate payment',
      error: error.message
    });
  }
}


/**
 * Handle VNPay Return: Verifies the payment response from VNPay.
 */
async function capturePayment(req, res) {
  const { coursesId } = req.body;
  const userId = req.user.id;

  if (!coursesId || coursesId.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide Course IDs' });
  }

  try {
      let totalAmount = 0;
      const selectedCourses = [];

      // Calculate total amount
      for (const courseId of coursesId) {
          const course = await Course.findById(courseId);
          if (!course) {
              return res.status(404).json({ success: false, message: `Course not found: ${courseId}` });
          }
          if (course.studentsEnrolled.includes(userId)) {
              return res.status(400).json({ success: false, message: `Already enrolled in course: ${course.courseName}` });
          }
          totalAmount += course.price;
          selectedCourses.push(course.courseName);
      }

      // Create order ID and info
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const orderInfo = `Payment for courses: ${selectedCourses.join(', ')}`;

      // Create VNPay payment URL
      const paymentUrl = createVNPayPaymentUrl(orderId, totalAmount, orderInfo);

      res.status(200).json({ 
          success: true, 
          paymentUrl: paymentUrl,
          orderId: orderId,
          amount: totalAmount,
          courses: coursesId
      });

  } catch (error) {
      console.error('Error initiating payment:', error);
      res.status(500).json({ 
          success: false, 
          message: 'Could not initiate payment',
          error: error.message 
      });
  }
}

/**
* Handle VNPay Return: Process the payment response from VNPay
*/
async function handleVNPayReturn(req, res) {
  try {
      const vnp_Params = req.query;
      const secureHash = vnp_Params['vnp_SecureHash'];
      
      // Remove hash params
      delete vnp_Params['vnp_SecureHashType'];
      delete vnp_Params['vnp_SecureHash'];

      // Sort params
      const sortedParams = Object.keys(vnp_Params)
          .sort()
          .reduce((acc, key) => {
              acc[key] = vnp_Params[key];
              return acc;
          }, {});

      // Create validation hash
      const queryString = querystring.stringify(sortedParams);
      const hmac = crypto.createHmac('sha512', process.env.VNPAY_HASH_SECRET);
      const calculatedHash = hmac.update(queryString).digest('hex');

      // Validate payment response
      if (secureHash === calculatedHash) {
          const paymentStatus = vnp_Params['vnp_ResponseCode'];
          
          if (paymentStatus === '00') {
              // Payment successful
              // Here you should:
              // 1. Update order status
              // 2. Enroll student in courses
              // 3. Send confirmation email
              
              const orderId = vnp_Params['vnp_TxnRef'];
              const amount = vnp_Params['vnp_Amount'] / 100; // Convert from VND cents
              
              await enrollStudents(coursesId, userId);
              await sendPaymentSuccessEmail(orderId, vnp_Params['vnp_TransactionNo'], amount);
              
              return res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
          } else {
              // Payment failed
              return res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
          }
      } else {
          // Invalid hash
          return res.redirect(`${process.env.FRONTEND_URL}/payment/failure?reason=invalid_hash`);
      }
  } catch (error) {
      console.error('Error processing VNPay return:', error);
      return res.redirect(`${process.env.FRONTEND_URL}/payment/failure?reason=server_error`);
  }
}
/**
 * Verify Payment: Validates payment signature and enrolls user in courses.
 */
async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, coursesId } = req.body;
  const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !coursesId || !userId) {
    return res.status(400).json({ success: false, message: 'Payment data missing' });
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(coursesId, userId);
    res.status(200).json({ success: true, message: 'Payment verified' });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
}

/**
 * Enroll Students: Enrolls user in courses and updates course progress.
 */
async function enrollStudents(courses, userId) {
  for (const courseId of courses) {
    const course = await Course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: userId } }, { new: true });
    const courseProgress = await CourseProgress.create({ courseId, userId, completedVideos: [] });
    await User.findByIdAndUpdate(userId, { $push: { courses: courseId, courseProgress: courseProgress._id } }, { new: true });

    const student = await User.findById(userId);
    await mailSender(student.email, `Enrolled in ${course.courseName}`, courseEnrollmentEmail(course.courseName, student.firstName));
  }
}

/**
 * Send Payment Success Email: Notifies user of successful payment.
 */
async function sendPaymentSuccessEmail(req, res) {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({ success: false, message: 'Missing data' });
  }

  try {
    const student = await User.findById(userId);
    await mailSender(student.email, 'Payment Received', paymentSuccessEmail(student.firstName, amount / 100, orderId, paymentId));
    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Could not send email' });
  }
}

module.exports = {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
};
