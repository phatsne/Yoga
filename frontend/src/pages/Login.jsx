import loginImg from "../assets/Images/HeroImg.png"
import Template from "../components/core/Auth/Template"
import Background from "../assets/Images/Background.jpg"
import Box from "@mui/material/Box";


function Login() {
  return (
      <Box sx={{
        backgroundImage:{Background}
      }}>
          <Template
            title="Chào mừng bạn đến với Heathylife"
            description1="Chăm sóc sức khỏe của bạn từ bây giờ"
            description2="Với những khóa học giúp cơ thể bạn tái tạo lại nguồn năng lượng đã mất"
            image={loginImg}
            formType="login"
          />
      </Box>
  )
}

export default Login