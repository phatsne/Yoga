import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import BmiTable from "../assets/Images/BmiTable1.jpg"


const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);
  const [healthStatus, setHealthStatus] = useState({ status: "", advice: "" });

  // Hàm tính BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
  };

  // Hàm lấy trạng thái sức khỏe
  const getHealthStatus = (bmi) => {
    if (bmi < 18.5)
      return { status: "Thiếu cân", advice: "Bổ sung dinh dưỡng hợp lý." };
    if (bmi < 25)
      return { status: "Bình thường", advice: "Duy trì lối sống lành mạnh." };
    if (bmi < 30)
      return { status: "Thừa cân", advice: "Cải thiện chế độ ăn uống." };
    return { status: "Béo phì", advice: "Tham khảo ý kiến bác sĩ." };
  };

  // Xử lý sự kiện khi nhấn nút tính toán
  const handleCalculate = () => {
    if (!weight || !height) {
      setError("Cân nặng và chiều cao không được để trống.");
      return;
    }

    if (weight <= 0 || height <= 0) {
      setError("Cân nặng và chiều cao phải là số dương.");
      return;
    }

    setError("");
    const bmi = calculateBMI(weight, height);
    const status = getHealthStatus(bmi);
    setBmiResult(bmi);
    setHealthStatus(status);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      <Box
        sx={{
          paddingTop: "50px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "left",
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
          BMI LÀ GÌ?
        </Typography>
        <Typography>
          BMI là viết tắt của "Body Mass Index" (Chỉ số khối cơ thể), đây là một
          phép đo tiêu chuẩn được sử dụng để đánh giá mức độ cân đối giữa cân nặng
          và chiều cao của một người. Chỉ số BMI giúp bạn phân loại tình trạng sức
          khỏe của mình là mập, bình thường, thiếu cân hay ốm.
        </Typography>
        <Typography>
          BMI (Chỉ số khối cơ thể) là phép tính đơn giản ước tính lượng mỡ trong
          cơ thể dựa trên chiều cao và cân nặng.
        </Typography>
        <Typography>
          Để tính chỉ số BMI của bạn, hãy sử dụng công thức sau:
        </Typography>
        <Typography sx={{ fontStyle: "italic", marginBottom: "20px" }}>
          BMI = Cân nặng (kg) / (Chiều cao (m))²
        </Typography>
        <Typography>
          Ví dụ, nếu bạn nặng 70 kg và cao 1,75 m, chỉ số BMI của bạn sẽ là:
        </Typography>
        <Typography sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          BMI = 70 / (1,75)² = 22,86
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "30px",
          }}
        >
          <Box
            sx={{
              maxWidth: "600px",
              width: "100%",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              CÔNG CỤ TÍNH BMI ONLINE
            </Typography>
            <Typography
              color="textSecondary"
              marginBottom="20px"
              textAlign="center"
            >
              Hãy nhập cân nặng và chiều cao để kiểm tra chỉ số BMI của bạn.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <TextField
                label="Cân nặng (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Chiều cao (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Button
              onClick={handleCalculate}
              variant="contained"
              size="large"
              sx={{ padding: "10px 20px", fontSize: "16px" }}
              fullWidth
            >
              Nhận Kết quả
            </Button>
            {error && (
              <Typography
                color="error"
                marginTop="20px"
                textAlign="center"
              >
                {error}
              </Typography>
            )}
          </Box>  
        </Box>
        <Box sx={{ marginTop: "50px" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          CHẨN ĐOÁN CÁC TÌNH TRẠNG CÂN NẶNG QUA BMI
        </Typography>
        <Typography>
          Nhìn chung, các phạm vi BMI sau đây (tính bằng kg/m2) phân loại các loại cân nặng khác nhau:
        </Typography>
        <Box sx={{ textAlign: "center", margin: "20px 0" }}>
          <img
            src={BmiTable}
            alt="Bảng phân loại BMI"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <Typography>
          BMI không phải là công cụ duy nhất mà nhà cung cấp sử dụng để phân loại các loại cân nặng. Các công cụ khác bao gồm:
        </Typography>
        <Typography>
          <ul>
            <li>Đo vòng eo.</li>
            <li>Đo độ dày của da bằng thước kẹp da ở một số vùng nhất định trên cơ thể, chẳng hạn như mặt sau cánh tay trên và dưới xương bả vai.</li>
            <li>Quét DEXA và phép đo thể tích dịch chuyển không khí (ADP) — những phương pháp này ít được sử dụng hơn.</li>
          </ul>
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          LỢI ÍCH CỦA VIỆC CHỈ SỐ BMI KHỎE MẠNH
        </Typography>
        <Typography>
          <ul>
            <li>Giúp giảm đau khớp</li>
            <li>Có nhiều năng lượng hơn, năng động hơn</li>
            <li>Cải thiện huyết áp</li>
            <li>Giảm hoàn toàn gánh nặng cho tim và hệ thống</li>
            <li>Giảm chất béo có hại trong máu, lượng đường trong máu và bệnh tiểu đường loại 2</li>
            <li>Giảm nguy cơ mắc các bệnh mãn tính như bệnh tim, ung thư.</li>
          </ul>
        </Typography>
      </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle
          id="dialog-title"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
        >
          KẾT QUẢ BMI
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#d32f2f", marginBottom: "10px" }}
          >
            BMI của bạn: {bmiResult}
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "medium", marginBottom: "10px" }}
          >
            Trạng thái: <strong>{healthStatus.status}</strong>
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "medium", color: "#555" }}
          >
            Lời khuyên: {healthStatus.advice}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BmiCalculator;
