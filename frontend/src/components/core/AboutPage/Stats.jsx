import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar, Box, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CEO from "../../../Assets/Images/team1.png"
import Phat from "../../../Assets/Images/team3.png"
import CEO5 from "../../../Assets/Images/team4.png"

const teamMembers = [
  {
    name: 'Phát Triệu',
    role: 'Huấn luyện viên Yoga',
    description: 'Body Balance không chỉ là bài tập mà còn là nghệ thuật sống, và Jacob Spencer sẽ truyền cảm hứng để bạn yêu thương cơ thể mình hơn mỗi ngày.',
    img: Phat,
  },
  {
    name: 'Minh Tâm',
    role: 'Giáo viên Yoga nhịp điệu',
    description: 'Kết hợp nhịp điệu âm nhạc với sự uyển chuyển của yoga, tạo nên một trải nghiệm độc đáo và đầy năng lượng cho học viên trong mỗi buổi tập',
    img: CEO,
  },
  {
    name: 'Minh Anh',
    role: 'Zumba Instructor',
    description: 'Với sự nhiệt huyết và chuyên môn cao, Lori luôn truyền cảm hứng để bạn vừa tập luyện, vừa tận hưởng niềm vui trên từng bước nhảy.',
    img: CEO5,
  },
];

const TeamSection = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
        Về đội ngũ của chúng tôi
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}
      >
        Chúng tôi tự hào mang đến đội ngũ chuyên gia giàu kinh nghiệm, 
        luôn tận tâm hỗ trợ bạn trên hành trình rèn luyện sức khỏe và nâng cao chất lượng cuộc sống.
      </Typography>
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                textAlign: 'center',
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={member.name}
                src={member.img}
                sx={{
                  width: 100,
                  height: 100,
                  marginBottom: 2,
                  border: '3px solid #ddd',
                }}
              />
              <CardContent sx={{ px: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontStyle: '' }}
                >
                  {member.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1, mb: 3, fontSize: '0.875rem' }}
                >
                  {member.description}
                </Typography>
                <Box display="flex" justifyContent="center" gap={1}>
                  <IconButton color="primary" size="small" sx={{ color: '#1DA1F2' }}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton color="primary" size="small" sx={{ color: '#4267B2' }}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton color="primary" size="small" sx={{ color: '#E60023' }}>
                    <PinterestIcon />
                  </IconButton>
                  <IconButton color="primary" size="small" sx={{ color: '#42A5F5' }}>
                    <VideoLibraryIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamSection;
