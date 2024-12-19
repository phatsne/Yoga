import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Hero1 from '../../../assets/Images/hero1.jpg';
import Hero2 from '../../../assets/Images/hero2.jpg';
import Hero3 from '../../../assets/Images/hero3.jpg';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <Container className="my-5">
            <Box textAlign="center" mb={5}>
                <Typography
                    variant="h6"
                    sx={{
                        color: "#90EE90",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        fontSize: "0.9rem",
                    }}
                >
                    Khóa Học Đề Xuất
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: "2rem",
                        lineHeight: "1.5",
                        color: "#333",
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    Học Ngay Một Khóa Yoga Online Với Chi Phí Thấp Nhất!
                </Typography>
                <Typography
                    sx={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        color: "#666",
                        fontSize: "1rem",
                        lineHeight: "1.8",
                    }}
                >
                    Dưới đây là một số khóa học Yoga phổ biến được nhiều khách hàng yêu thích và đánh giá cao tại{" "}
                    <a
                        href="/blog"
                        style={{
                            color: "#90EE90",
                            fontWeight: "bold",
                            textDecoration: "none",
                            transition: "color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#76c776")}
                        onMouseOut={(e) => (e.target.style.color = "#90EE90")}
                    >
                        HeathyLife
                    </a>
                    .
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {[Hero1, Hero2, Hero3].map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, height: "100%" }}>
                            <CardMedia
                                component="img"
                                alt={`Hero${index + 1}`}
                                image={image}
                                sx={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }}
                            />
                            <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {index === 0
                                        ? "Tập Yoga Cơ Bản Ngay Tại Nhà Với Nguyễn Hiếu"
                                        : index === 1
                                        ? "Yoga Giảm Eo, Giảm Mỡ Giữ Dáng Thon Gọn"
                                        : "Yoga Trẻ Hóa Và Làm Đẹp Cho Khuôn Mặt"}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {index === 0
                                        ? "Khóa học được thiết kế dành cho người mới bắt đầu. Bắt đầu hành trình thay đổi bản thân với những tư thế đơn giản, không gây nguy hiểm nhưng mang lại hiệu quả tuyệt vời."
                                        : index === 1
                                        ? "Các tư thế trong khóa học được thiết kế dành riêng cho những bạn muốn đánh tan mỡ bụng, lấy lại vóc dáng. Ngoài ra còn cung cấp các bài tập giúp tạo đường cong hoàn mỹ."
                                        : "Bạn không có nhiều thời gian chăm sóc sắc đẹp? Đừng lo lắng, vì khóa học này được thiết kế dành cho bạn. Với kĩ thuật đơn giản, an toàn, làn da của bạn sẽ trở nên săn mịn và tràn đầy sức sống."}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#90EE90",
                                    color: "#ffffff",
                                    mt: 2,
                                    "&:hover": {
                                        backgroundColor: "#76c776",
                                    },
                                }}
                                onClick={() => navigate("/signup")}
                            >
                                Tìm Hiểu Thêm
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HeroSection;
