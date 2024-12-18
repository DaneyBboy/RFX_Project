import React, { useState } from "react";
import {
  AppBar,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Rfxcreation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    proposalCriteria: "",
    rfxNumber: "",
    dateIssued: "",
    contactPerson: "",
    submissionDate: "",
    purpose: "",
    projectGoals: "",
    projectSummary: "",
    scopeOfWork: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.proposalCriteria) newErrors.proposalCriteria = "Required";
    if (!formData.rfxNumber) newErrors.rfxNumber = "Required";
    if (!formData.dateIssued) newErrors.dateIssued = "Required";
    if (!formData.contactPerson) newErrors.contactPerson = "Required";
    if (!formData.submissionDate) newErrors.submissionDate = "Required";
    if (!formData.purpose) newErrors.purpose = "Required";
    if (!formData.projectGoals) newErrors.projectGoals = "Required";
    if (!formData.projectSummary) newErrors.projectSummary = "Required";
    if (!formData.scopeOfWork) newErrors.scopeOfWork = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    if (validateForm()) {
      async function createRfx() {
        const response = await fetch('http://localhost:4000/rfx/create', {
          method: "POST",
          body: JSON.stringify(formData),
          headers:{
            "content-type":"application/json"
          }
        });
        console.log(response)
        navigate("/pricecreate");
      }
      createRfx()
    }
  };

 

  return (
    <div>
      <br />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Creation of RFx</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: "1% 3% 1% 5%" }}>
        <FormControl>
          <label htmlFor="proposal-criteria" variant="body1">
            Select the Proposal Criteria
          </label>
          <Select
            id="proposal-criteria"
            style={{ width: "500px" }}
            name="proposalCriteria"
            value={formData.proposalCriteria}
            onChange={handleChange}
            error={!!errors.proposalCriteria}
          >

            <MenuItem value="Request for Proposal">Request for Proposal</MenuItem>
            <MenuItem value="Request for Information">Request for Information</MenuItem>
            <MenuItem value="Request for Quotation">Request for Quotation</MenuItem>
          </Select>
          {errors.proposalCriteria && (
            <Typography color="error">{errors.proposalCriteria}</Typography>
          )}

          <label htmlFor="rfx-no" variant="body1">
            RFx Number
          </label>
          <TextField
            id="rfx-no"
            sx={{ width: "500px" }}
            type="text"
            name="rfxNumber"
            value={formData.rfxNumber}
            onChange={handleChange}
            error={!!errors.rfxNumber}
            helperText={errors.rfxNumber}
          />

          <label htmlFor="date-issue" variant="body1">
            Date Issued
          </label>
          <TextField
            id="date-issue"
            sx={{ width: "500px" }}
            type="date"
            name="dateIssued"
            value={formData.dateIssued}
            onChange={handleChange}
            error={!!errors.dateIssued}
            helperText={errors.dateIssued}
          />

          <label htmlFor="contact-person" variant="body1">
            Contact Person
          </label>
          <TextField
            id="contact-person"
            sx={{ width: "500px" }}
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            error={!!errors.contactPerson}
            helperText={errors.contactPerson}
          />

          <label htmlFor="sub-date" variant="body1">
            RFx Submission Date
          </label>
          <TextField
            id="sub-date"
            sx={{ width: "500px" }}
            type="date"
            name="submissionDate"
            value={formData.submissionDate}
            onChange={handleChange}
            error={!!errors.submissionDate}
            helperText={errors.submissionDate}
          />

          <label htmlFor="purpose" variant="body1">
            Purpose of RFP
          </label>
          <TextField
            id="purpose"
            sx={{ minWidth: "1000px" }}
            multiline
            minRows={4}
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            error={!!errors.purpose}
            helperText={errors.purpose}
          />

          <label htmlFor="project" variant="body1">
            Project Goals and Objectives
          </label>
          <TextField
            id="project"
            sx={{ minWidth: "1000px" }}
            multiline
            minRows={4}
            type="text"
            name="projectGoals"
            value={formData.projectGoals}
            onChange={handleChange}
            error={!!errors.projectGoals}
            helperText={errors.projectGoals}
          />

          <label htmlFor="summary" variant="body1">
            Project Background and Summary
          </label>
          <TextField
            id="summary"
            sx={{ minWidth: "1000px" }}
            multiline
            minRows={4}
            type="text"
            name="projectSummary"
            value={formData.projectSummary}
            onChange={handleChange}
            error={!!errors.projectSummary}
            helperText={errors.projectSummary}
          />

          <label variant="body1">Scope of Work</label>
          <TextField
            sx={{ minWidth: "1000px" }}
            multiline
            minRows={4}
            type="text"
            name="scopeOfWork"
            value={formData.scopeOfWork}
            onChange={handleChange}
            error={!!errors.scopeOfWork}
            helperText={errors.scopeOfWork}
          />

          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleClick}
          >
            Submit
          </Button>


        </FormControl>
      </div>
    </div>
  );
}
