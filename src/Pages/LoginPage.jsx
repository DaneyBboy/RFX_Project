import React, { useContext, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import image from "../Images/Dashboard_Login.jpg";
import { LoginContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


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
  const {login } = useContext(LoginContext);



  const navigate = useNavigate();

  const [formValues, setFormvalues] = useState({
    email: "",
    password: "",
    error: "",
    success: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formValues,
      [name]: value,
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    

    const response = await fetch('http://localhost:4000/auth/login', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        
      },
      body: JSON.stringify(formValues)
    })

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem('authToken', JSON.stringify(data.token));
      const decoded = jwtDecode(data.token);

      if (decoded.role === 'admin') {
        login('admin');

      } else if (decoded.role === 'vendor') {
        login('vendor');

      } else {
        alert(data.message);

      }
    }

    else {

      alert(data.message);

    }

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
          {formValues.error && <p style={styles.error}>{formValues.error}</p>}
          {formValues.success && <p style={styles.success}>{formValues.success}</p>}

        </LoginForm>
        <Button onClick={handleSignup} style={{ display: "block", margin: "10px auto" }} variant="contained" color="primary">Create New User </Button>
      </FormSection>

    </Container>

  );
};

export default LoginPage;
