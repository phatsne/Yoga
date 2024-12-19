import React from "react";
import ContactUsForm from '../ContactPage/ContactUsForm';


const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">Liên Hệ Với Chúng Tôi</h1>
      <p className="text-center text-richblack-300 mt-3">
        Chúng tôi luôn sẵn sàng hỗ trợ các bạn 
      </p>
      <div className="mt-12 mx-auto bg-[#eaf7fa]">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;