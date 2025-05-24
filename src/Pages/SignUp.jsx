import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import image from "../Images/Dashboard_Login.jpg";
import { useNavigate } from "react-router-dom";


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

const SignUP = () => {

const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    id:"",
    email: "",
    name: "",
    password: "",
    role: "",
    error: "",
    success: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Log the form values
    console.log("Form Values Submitted:", formValues);
    // SEND VALUES TO DATABASE AND VALIDATE

   const response =  await fetch(`${process.env.REACT_APP_API_URL}/auth/createuser`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(formValues)
    })
    if (response.ok){
      navigate('/')
    }
  };

 
return (
  <Container>
    <FormSection style={{ backgroundImage: `url(${image})` }}>
      <LoginForm component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          required
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="text"
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
          value={formValues.password}
          required
          onChange={handleChange}
        />
        <TextField
          label="Role"
          name="role"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={formValues.role}
          placeholder="type admin or vendor"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
        {formValues.error && <p style={styles.error}>{formValues.error}</p>}
        {formValues.success && <p style={styles.success}>{formValues.success}</p>}
      </LoginForm>
    </FormSection>
  </Container>
);
};

export default SignUP;
