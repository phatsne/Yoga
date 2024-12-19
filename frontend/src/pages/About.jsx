import React from "react";

import FoundingStory from "../assets/Images/CEO_MinhTam.jpg";
import BannerImage1 from "../assets/Images/yoga-co-ban.jpg";
import BannerImage2 from "../assets/Images/yoga-trung-binh.jpg";
import BannerImage3 from "../assets/Images/yoga-kho.jpg";

import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
// import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
import Img from "../components/common/Img";
import ReviewSlider from "../components/common/ReviewSlider";

import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

const About = () => {
  return (
    <div className="bg-[#ebfff7]">
      {/* Hero Section */}
      <section className="bg-[#ebfff7]">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center ">
          <motion.header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            <motion.p
              variants={fadeIn("down", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
            >
              Khơi Nguồn Cảm Hứng Yoga Cho Một{" "}
              <HighlightText text={"Cuộc Sống Tốt Đẹp Hơn"} />
            </motion.p>

            <motion.p
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]"
            >
              HealthyLife là nơi giúp bạn cải thiện sức khỏe và tinh thần qua
              các khóa học yoga chất lượng cao. Chúng tôi tin rằng yoga là
              chìa khóa để xây dựng một cuộc sống hạnh phúc, cân bằng và tràn
              đầy năng lượng.
            </motion.p>
          </motion.header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-full flex justify-center">
            <div className="grid grid-cols-3 gap-3 lg:gap-5">
              <Img
                src={BannerImage1}
                alt="Yoga pose 1"
                className="h-60 w-60 object-cover"
              />
              <Img
                src={BannerImage2}
                alt="Yoga pose 2"
                className="h-60 w-60 object-cover"
              />
              <Img
                src={BannerImage3}
                alt="Yoga pose 3"
                className="h-60 w-60 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-b border-blue-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className=""></div>
          <Quote />
        </div>
      </section>

      {/* Founding Story Section */}
      <section className="bg-[#f0fff4]">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-blue-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
              className="my-24 flex lg:w-[50%] flex-col gap-10"
            >
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Câu Chuyện Thành Lập
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                HealthyLife bắt đầu từ mong muốn chia sẻ lợi ích tuyệt vời của
                yoga đến với mọi người. Đội ngũ sáng lập gồm những chuyên gia
                yoga, chuyên gia sức khỏe và những người đam mê yoga đã cùng
                nhau xây dựng một nền tảng học tập trực tuyến hiện đại.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Chúng tôi tin rằng yoga không chỉ cải thiện sức khỏe thể chất
                mà còn giúp bạn tìm thấy sự an yên trong tâm hồn, mang lại một
                cuộc sống cân bằng và đầy cảm hứng.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
            >
              <Img
                src={FoundingStory}
                alt="Câu chuyện thành lập"
                className="w-1/2 h-auto mx-auto"
              />
            </motion.div>
          </div>

          {/* Vision and Mission */}
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Tầm Nhìn Của Chúng Tôi
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Chúng tôi mong muốn mang yoga đến gần hơn với tất cả mọi
                người, bất kể bạn ở đâu hay ở độ tuổi nào. Yoga là một phần
                quan trọng giúp bạn sống khỏe mạnh và hạnh phúc hơn.
              </p>
            </div>

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Sứ Mệnh Của Chúng Tôi
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Sứ mệnh của chúng tôi không chỉ là mang lại các khóa học yoga
                chất lượng mà còn tạo ra một cộng đồng chia sẻ và học hỏi.
                HealthyLife là nơi mọi người kết nối, hỗ trợ nhau trong hành
                trình phát triển bản thân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsComponenet />

      {/* Learning Grid & Contact Form */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10  bg-[#ebfff7]">
        {/* <LearningGrid /> */}
        <ContactFormSection />
      </section>

      {/* Reviews Section */}
      <div className=" my-20 px-5  ">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Đánh Giá Từ Người Học
        </h1>
        {/* <ReviewSlider /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
