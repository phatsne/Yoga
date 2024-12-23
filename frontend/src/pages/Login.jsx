import loginImg from "../assets/Images/login.png"
import Template from "../components/core/Auth/Template"
import Background from "../assets/Images/Background.jpg"
import Box from "@mui/material/Box";


function Login() {
  return (
      <Box sx={{
        backgroundImage:{Background}
      }}>
          <Template
            title="Bắt đầu ngay hôm nay cùng chúng tôi"
            description1="Chăm sóc sức khỏe của bạn từ bây giờ"
            description2="Chào đón một ngày mới tràn đầy năng lượng"
            image={loginImg}
            formType="login"
          />
      </Box>
  )
}

export default Login