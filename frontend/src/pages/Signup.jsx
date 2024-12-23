import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Cùng nhau chia sẻ kinh nghiệm "
      description1="Phát triển, học tập"
      description2="Sáng tạo các khóa học, cùng nhau học tập, rèn luyện sức khỏe"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup