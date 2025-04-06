import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import photo1 from "../assets/photo1.png";  
import photo2 from "../assets/photo2.jpg";  
import photo3 from "../assets/photo3.jpg";  
import webDdevelopment from "../assets/webDev.jpg";
import mobileAppDevelopment from "../assets/mobile.jpg";
import uiUxDesign from "../assets/UIUX.jpg";
import userComment from "../assets/comment1.jpg";
import userComment2 from "../assets/comment2.jpg";
import { useSelector } from 'react-redux';
import logo from "../assets/bugbustersLogo.jpeg"; 


const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Container maxWidth="lg">

    
  <Box 
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center" 
    py={3} 
    sx={{ bgcolor: "#f0f4f8", borderRadius: "12px", boxShadow: 2, mb: 4 }}
  >
    <Box display="flex" alignItems="center" gap={2}>
      <img 
        src={logo} 
        alt="Group Logo" 
        style={{ height: "60px", borderRadius: "8px" }} 
      />
      <Typography variant="h5" fontWeight="bold" color="primary">
        BugBusters Team
      </Typography>
    </Box>
    <Typography variant="subtitle1" fontStyle="italic" color="textSecondary" mt={1}>
      Proudly Presents
    </Typography>
  </Box>

      
      {/* Hero Section */}
      <Box 
        sx={{
          backgroundImage: `url(${photo3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          borderRadius: "12px",
          mb: 4,
          px: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to DevHive Solutions
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, maxWidth: "600px" }}>
          Innovation, Quality, and Excellence in Every Step.
        </Typography>

        {
          !isAuthenticated ? (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 3, borderRadius: "8px", fontSize: "16px", padding: "10px 20px" }}
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 3, borderRadius: "8px", fontSize: "16px", padding: "10px 20px" }}
              onClick={() => navigate("/product-list")}
            >
              Go to Product List
            </Button>
          )
        }
   
      </Box>

      {/* About Us Section */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" my={4}>
        Who We Are
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, height: "100%" }}>
            <CardMedia
              component="img"
              image={photo1}
              alt="Our Mission"
              sx={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent sx={{ minHeight: "150px" }}> 
              <Typography variant="h6" fontWeight="bold">
                Our Mission
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                We strive to provide the best digital solutions for businesses and individuals. 
                Our goal is to combine technology and creativity to deliver outstanding results.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, height: "100%" }}>
            <CardMedia
              component="img"
              image={photo2}
              alt="Why Choose Us"
              sx={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent sx={{ minHeight: "150px" }}>
              <Typography variant="h6" fontWeight="bold">
                Why Choose Us?
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                With years of experience, a passionate team, and a commitment to excellence, 
                we ensure that every project meets the highest standards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Our Services Section */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" my={5}>
        Our Services
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={webDdevelopment}
              alt="Service"
              sx={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Web Development
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We build modern and scalable web applications tailored to your needs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={mobileAppDevelopment}
              alt="Service"
              sx={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Mobile App Development
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Creating user-friendly and high-performance mobile applications.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={uiUxDesign}
              alt="Service"
              sx={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                UI/UX Design
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Designing stunning user interfaces and seamless user experiences.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Testimonials Section */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" my={5}>
        What Our Clients Say
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <CardMedia
              component="img"
              image={userComment}
              alt="Client"
              sx={{ height: "80px", width: "80px", borderRadius: "50%", mx: "auto", my: 1 }}
            />
            <CardContent>
              <Typography variant="body1" fontStyle="italic">
              ⭐⭐⭐⭐⭐ – "I was skeptical at first, but this site is a game-changer! Found exactly what I was looking for with all the details I needed. Highly recommend!"
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="right">
                - Luyis
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <CardMedia
              component="img"
              image={userComment2}
              alt="Client"
              sx={{ height: "80px", width: "80px", borderRadius: "50%", mx: "auto", my: 1 }}
            />
            <CardContent>
              <Typography variant="body1" fontStyle="italic">
              ⭐⭐⭐⭐⭐ – "Super easy to navigate and full of useful information. Saved me so much time searching for the right product!"
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="right">
                - Jane Smith
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box textAlign="center" mt={5} py={3} sx={{ bgcolor: "#f5f5f5", borderRadius: "12px" }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 Bugbusters | All Rights Reserved
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
