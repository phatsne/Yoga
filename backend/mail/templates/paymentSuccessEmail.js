/**
 * Generates the content for the payment success email.
 * @param {string} name - The name of the recipient.
 * @param {number} amount - The payment amount.
 * @param {string} orderId - The order ID.
 * @param {string} paymentId - The payment ID.
 * @returns {string} - The HTML content for the email.
 */
function paymentSuccessEmail(name, amount, orderId, paymentId) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Payment Success!</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>We are pleased to inform you that your payment was successful. Here are the details of your transaction:</p>
      <ul>
        <li><strong>Amount Paid:</strong> $${(amount / 100).toFixed(2)}</li>
        <li><strong>Order ID:</strong> ${orderId}</li>
        <li><strong>Payment ID:</strong> ${paymentId}</li>
      </ul>
      <p>Thank you for your purchase! We hope you enjoy your course.</p>
      <p>If you have any questions or concerns, feel free to contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
      <p>Best regards,</p>
      <p><strong>Your Company Team</strong></p>
    </div>
  `;
}

module.exports = paymentSuccessEmail;
