import React, { useEffect, useState } from "react";
import {AppBar, Button, FormControl, MenuItem, TextField, Toolbar, Typography,} from "@mui/material";
import { Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function Rfxcreation() {

   // Remove `rfxNumber` when the component first renders
 useEffect(() => {
  localStorage.removeItem("rfxNumber");
  console.log("rfxNumber removed from local storage");
}, []); // Empty dependency array ensures this runs only once on initial render
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
    fileUpload:null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFilechange = (e) => {
    setFormData({
      ...formData, 
      fileUpload: e.target.files[0]
    });
    console.log(formData.fileUpload);
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

  const handleClick =  () => {

    const form = new FormData()
    form.append('proposalCriteria', formData.proposalCriteria);
    form.append('rfxNumber', formData.rfxNumber);
    form.append('dateIssued',formData.dateIssued);
    form.append('contactPerson',formData.contactPerson);
    form.append('submissionDate', formData.submissionDate);
    form.append('purpose', formData.purpose);
    form.append('projectGoals', formData.projectGoals);
    form.append('scopeOfWork', formData.scopeOfWork);
    form.append('fileUpload', formData.fileUpload);
    form.append('fileName',formData.fileUpload.name)

    
    if (validateForm()) {
      async function createRfx() {
        const token = JSON.parse(localStorage.getItem('authToken'));
        

        if (!token) {
          console.error('No token found');
          return; // Handle the case where no token is available
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/rfx/createnew`, {
          method: "POST",
          body: form,
          // headers: {
          //   "content-type": "application/json",
          //   "Authorization": `Bearer ${token}`
          // }
        });

        if (response.ok) {
          JSON.stringify(localStorage.setItem('rfxNumber', formData.rfxNumber))
          navigate("/pricecreate");

        } else {
          console.error("Failed to create RFx:", response.statusText);
        }

      }
      createRfx()
    }
    console.log(formData)
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
          <div style={{margin:"10px 0px"}}><Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}>
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleFilechange}
              multiple
            />
          </Button></div>
          

          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleClick}>
            Submit
          </Button>


        </FormControl>
      </div>
    </div>
  );
}
