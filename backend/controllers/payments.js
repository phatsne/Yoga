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

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Create Payment
async function createPayment(req, res) {
  try {
    const { orderId, amount, orderInfo } = req.body;

    // Validate required fields
    if (!orderId || !amount || !orderInfo) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Generate VNPay payment URL
    const paymentUrl = createVNPayPaymentUrl(orderId, amount, orderInfo);
    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error('Error creating VNPay payment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

// Handle VNPay Return
function handleVNPayReturn(req, res) {
  const vnp_Params = req.query;

  const secureHash = vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];
  delete vnp_Params['vnp_SecureHash'];

  const sortedParams = Object.keys(vnp_Params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = vnp_Params[key];
      return acc;
    }, {});

  const queryString = querystring.stringify(sortedParams);
  const hmac = crypto.createHmac('sha512', process.env.VNPAY_HASH_SECRET);
  const hash = hmac.update(queryString).digest('hex');

  if (secureHash === hash) {
    res.json({ message: 'Payment successful', data: vnp_Params });
  } else {
    res.json({ message: 'Payment verification failed', data: vnp_Params });
  }
}

// Capture Payment
async function capturePayment(req, res) {
  const { coursesId } = req.body;
  const userId = req.user.id;

  if (!coursesId || coursesId.length === 0) {
    return res.status(400).json({ success: false, message: 'Please provide Course IDs' });
  }

  try {
    let totalAmount = 0;

    for (const courseId of coursesId) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      if (course.studentsEnrolled.includes(userId)) {
        return res.status(400).json({ success: false, message: 'Already enrolled' });
      }
      totalAmount += course.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: Math.random().toString(),
    };

    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({ success: true, message: paymentResponse });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ success: false, message: 'Could not initiate payment' });
  }
}

// Verify Payment
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

// Enroll Students
async function enrollStudents(courses, userId) {
  for (const courseId of courses) {
    const course = await Course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: userId } }, { new: true });
    const courseProgress = await CourseProgress.create({ courseId, userId, completedVideos: [] });
    await User.findByIdAndUpdate(userId, { $push: { courses: courseId, courseProgress: courseProgress._id } }, { new: true });

    const student = await User.findById(userId);
    await mailSender(student.email, `Enrolled in ${course.courseName}`, courseEnrollmentEmail(course.courseName, student.firstName));
  }
}

// Send Payment Success Email
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
