import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "Biến Đổi Cuộc Sống Của Bạn với",
    highlightText: "Yoga và Sức Khỏe",
    description:
      "Tham gia cộng đồng toàn cầu của chúng tôi để khám phá nghệ thuật cổ điển của yoga và các thực hành sức khỏe hiện đại, nhằm đạt được một cuộc sống khoẻ mạnh và cân bằng hơn. Các chương trình linh hoạt và cá nhân hóa cho tất cả mọi người, ở khắp mọi nơi.",
    BtnText: "Bắt Đầu",
    BtnLink: "/yoga", 
  },
  {
    order: 1,
    heading: "Thực Hành Toàn Diện cho Tâm Trí và Cơ Thể",
    description:
      "Khám phá các bài tập yoga và thực hành chánh niệm được thiết kế để tăng cường sức mạnh cơ thể, làm dịu tâm trí và cải thiện sức khỏe tổng thể.",
  },
  {
    order: 2,
    heading: "Chương Trình Phù Hợp Mọi Trình Độ",
    description:
      "Dù bạn là người mới bắt đầu hay đã có kinh nghiệm, các chương trình của chúng tôi được thiết kế để phù hợp với tất cả trình độ, đảm bảo một hành trình bổ ích cho tất cả mọi người.",
  },
  {
    order: 3,
    heading: "Hướng Dẫn Bởi Giảng Viên Yoga Chứng Nhận",
    description:
      "Học hỏi từ những giảng viên yoga đã được chứng nhận và có kinh nghiệm, những người sẽ hướng dẫn bạn đạt được các mục tiêu về sức khỏe và lối sống lành mạnh.",
  },
  {
    order: 4,
    heading: "Theo Dõi Tiến Trình Dễ Dàng",
    description:
      "Sử dụng các công cụ tích hợp của chúng tôi để giám sát tiến trình của bạn, đặt mục tiêu cá nhân và duy trì động lực trên con đường đạt đến sức khỏe.",
  },
  {
    order: 5,
    heading: "Sẵn Sàng Cho Cuộc Sống Khỏe Mạnh",
    description:
      "Đón nhận một lối sống đặt sức khỏe, sinh lực và hạnh phúc lên hàng đầu với các nguồn tài nguyên yoga và sức khỏe toàn diện của chúng tôi.",
  },
];

const LearningGrid = () => {

  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                  ? "bg-richblack-800 h-[294px]"
                  : "bg-transparent"
              } ${card.order === 3 && "lg:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
