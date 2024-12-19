import React from 'react';
// import { motion } from 'framer-motion';
// import { fadeIn } from '../../common/motionFrameVarients';

import Hero1 from '../../../assets/Images/hero1.jpg';
import Hero2 from '../../../assets/Images/hero2.jpg';
import Hero3 from '../../../assets/Images/hero3.jpg';
// import timelineImage from '../../../assets/Images/TimelineImage.png';

// import Img from '../../common/Img';

const timeline = [
    {
        image: Hero1,
        heading: 'Sức Khỏe Là Hạnh Phúc',
        Description: 'Chúng tôi cam kết mang đến sức khỏe và sự cân bằng cho từng học viên.',
    },
    {
        image: Hero2,
        heading: 'Trách Nhiệm Cộng Đồng',
        Description: 'Luôn đặt lợi ích và sự phát triển của học viên lên hàng đầu.',
    },
    {
        image: Hero3,
        heading: 'Linh Hoạt Thời Gian',
        Description: 'Học mọi lúc, mọi nơi với các khóa học trực tuyến đa dạng.',
    },
];

const TimelineSection = () => {
    return (
        <div className="py-10 bg-gray-50">
            <div className="text-center mb-8">
                <h2 className="text-green-600 uppercase text-sm font-semibold">
                Khóa Học Đề Xuất
                </h2>
                <h3 className="text-2xl lg:text-3xl font-bold">
                Học Ngay Một Khóa Yoga Online Với Chi Phí Thấp Nhất!
                </h3>
                <p className="text-gray-600 mt-2">
                Dưới đây là một số khóa học Yoga phổ biến được nhiều khách hàng yêu thích
                và đánh giá cao tại <span className="text-green-600 font-semibold">HealthyLife</span>.
                </p>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                    <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                        <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                            {course.buttonText}
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineSection;
