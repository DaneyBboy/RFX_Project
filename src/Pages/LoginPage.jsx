import React, { useContext, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import image from "../Images/Dashboard_Login.jpg";
import { LoginContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

// Styled components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
}));

const FormSection = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  padding: "20px",
});

const LoginForm = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
});

const styles = {
  error: {
    color: "red",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
};

const LoginPage = () => {
  const { loggedIn, setLoggedin, login } = useContext(LoginContext);
  console.log("context variable", loggedIn);

  const navigate = useNavigate();

  const[formValues , setFormvalues] = useState({
    email:"",
    password:"",
    error:"",
    success:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formValues,
      [name]: value,
    });
  };


  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reponse = await fetch('http://localhost:4000/auth/login',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(formValues)
    })

    if (reponse.ok) {
      login('admin');
      setSuccess("Login successful!");
    } else if (email === "vendor" && password === "Vendor@123") {
      login("vendor");
      setSuccess("Login successful!");
    }
    else {
      // Simulate successful login
      setLoggedin(false);
      setSuccess("");
      setError("Invalid email or password. Please try again.");
    }
    // Handle login logic here
    console.log("Form submitted");
    console.log("context variable", loggedIn);
    // SEND VALUES TO DATABASE AND VALIDATE
  };

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <Container>
      <FormSection style={{ backgroundImage: `url(${image})` }}>
        <LoginForm component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formValues.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formValues.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

        </LoginForm>
        <Button onClick={handleSignup} style={{display:"block", margin:"10px auto"}} variant="contained" color="primary">Create New User </Button>
      </FormSection>
      
    </Container>
    
  );
};

export default LoginPage;
