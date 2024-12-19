import React from 'react'
import About from '../../../assets/Images/about.jpg'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from './../../common/Img';

import { motion } from 'framer-motion'
import { scaleUp } from './../../common/motionFrameVarients';

const InstructorSection = () => {
  return (
    <div>
      <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>

        <motion.div
          variants={scaleUp}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%] '>
          <Img
            src={About}
            alt="Instructor"
            className='shadow-white rounded-3xl'
          />
        </motion.div>
    
        <div className='lg:w-[50%] flex flex-col'>
          <div className='text-3xl lg:text-4xl font-semobold w-[50%] mb-2'>
            <span className="text-[#00796b]">Đôi Nét Về </span>
            <HighlightText text={"Healthy Life"} />
          </div>

          <p className='font-medium text-[16px] w-[80%] text-richblack-300 mb-12'>
            Healthy Life là nền tảng trực tuyến hỗ trợ người dùng xây dựng lối sống lành mạnh thông qua các nội dung và công cụ tiện ích. Trang web tập trung vào các lĩnh vực chính như dinh dưỡng, tập luyện thể dục, sức khỏe tinh thần, và theo dõi sức khỏe cá nhân.
          </p>
          <p className='font-medium text-[16px] w-[80%] text-richblack-300 mb-12'>
            Healthy Life mang đến một giải pháp linh hoạt, giúp yoga trở nên dễ tiếp cận hơn bao giờ hết, đồng thời xây dựng một cộng đồng tích cực, nơi mọi người có thể cùng nhau cải thiện sức khỏe và tìm kiếm cân bằng trong cuộc sống.
          </p>

          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center'>
                Bắt Đầu Hành Trình Sống Khỏe
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
