const crypto = require('crypto');
const querystring = require('querystring');
require('dotenv').config(); // Load the environment variables

const vnpayConfig = {
  vnp_TmnCode: process.env.VNP_TMN_CODE, // Accessing the VNPay TMN Code
  vnp_HashSecret: process.env.VNP_HASH_SECRET, // Accessing the VNPay Hash Secret
  vnp_Url: process.env.VNP_URL, // Accessing the VNPay URL
  vnp_ReturnUrl: process.env.VNP_RETURN_URL, // Accessing the VNPay Return URL
};

console.log(vnpayConfig);  // Check if everything is correct


const createVNPayPaymentUrl = (orderId, amount, orderInfo) => {
  const vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: vnpayConfig.vnp_TmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_Amount: amount * 100, // Số tiền (VND) x 100
    vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
    vnp_IpAddr: '127.0.0.1', // IP của client
    vnp_CreateDate: new Date().toISOString().slice(0, 19).replace('T', '').replace(/-/g, '').replace(/:/g, ''),
  };

  // Sắp xếp các tham số theo thứ tự từ điển
  const sortedParams = Object.keys(vnp_Params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = vnp_Params[key];
      return acc;
    }, {});

  // Tạo chuỗi query
  const queryString = querystring.stringify(sortedParams);

  // Ký hash dữ liệu
  const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
  const secureHash = hmac.update(queryString).digest('hex');

  // Tạo URL thanh toán
  return `${vnpayConfig.vnp_Url}?${queryString}&vnp_SecureHash=${secureHash}`;
};

module.exports = { createVNPayPaymentUrl };
