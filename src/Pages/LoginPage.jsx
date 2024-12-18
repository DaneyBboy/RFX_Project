import React, { useContext, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import image from "../Images/Dashboard_Login.jpg";
import { LoginContext } from "../Context/Context";

// Styled components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
}));

const FormSection = styled(Box)({
  flex: 1,
  display: "flex",
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "admin" && password === "Admin@123") {
      login('admin');
      setSuccess("Login successful!");
    }else if(email === "vendor" && password === "Vendor@123"){
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

  return (
    <Container>
      <FormSection style={{ backgroundImage: `url(${image})` }}>
        <LoginForm component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
        </LoginForm>
      </FormSection>
    </Container>
  );
};

export default LoginPage;
