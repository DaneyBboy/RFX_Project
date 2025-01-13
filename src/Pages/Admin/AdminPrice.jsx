import {
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import BasicModal from "/home/daney/Desktop/Rfx_project/RFX_Project/src/Components/BasicModal.jsx"
import { useNavigate } from "react-router-dom";

export default function AdminPrice() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([
    {
      Srno: "1",
      itemName: "",
      description: "",
      quantity: "",
      uom: "",
      unitRate: "",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...formData];
    updatedData[index][name] = value;
    setFormData(updatedData);
  };

  // Function to add a new row
  const addRow = () => {
    const newRow = {
      Srno: (formData.length + 1).toString(),
      itemName: "",
      description: "",
      quantity: "",
      uom: "",
      unitRate: "",
    };
    setFormData([...formData, newRow]);
  };

  // Handle form submission
  const handleClick = async () => {
    try {
      // Prepare data to send to the backend
      const dataToSubmit = formData.map((item) => ({
        rfxNumber: JSON.parse(localStorage.getItem('rfxNumber')),
        Srno: item.Srno,
        itemName: item.itemName,
        description: item.description,
        quantity: parseFloat (item.quantity) || 0,
        uom: item.uom || 0,
        unitRate: parseFloat(item.unitRate),
        totalPrice: item.quantity && item.unitRate
          ? (parseFloat(item.quantity) * parseFloat(item.unitRate)).toFixed(2)
          : 0.00,
      }));

      // Send data to backend using fetch
      const response = await fetch("http://localhost:4000/price/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit), // Sending data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        setModalOpen(true);
        console.log(result); // Handle success response from server
        setTimeout(() => navigate("/listrfx"), 3000)
        
        
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <div>
      <FormControl>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Item Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit of Measurement</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={item.Srno}
                      multiline
                      minRows={1}
                      variant="outlined"
                      name="Srno"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={item.itemName}
                      multiline
                      minRows={1}
                      variant="outlined"
                      name="itemName"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={item.description}
                      multiline
                      minRows={1}
                      variant="outlined"
                      name="description"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={item.quantity}
                      multiline
                      minRows={1}
                      variant="outlined"
                      name="quantity"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={item.uom}
                      multiline
                      minRows={1}
                      variant="outlined"
                      name="uom"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={item.unitRate}
                      multiline
                      minRows={1}
                      variant="outlined"
                      name="unitRate"
                      onChange={(e) => handleChange(e, index)}
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    {/* Total Price Calculation */}
                    {item.quantity && item.unitRate
                      ? (parseFloat(item.quantity) * parseFloat(item.unitRate)).toFixed(2)
                      : "0.00"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Correcting the sx prop */}
        <Button
          variant="contained"
          color="primary"
          onClick={addRow}
          style={{ width: "103px", margin:"10px 0px auto auto " }}
        >
          Add Row
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          style={{ marginTop: "16px", marginLeft: "10px" }}
        >
          Submit
        </Button>
      </FormControl>
      <BasicModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  );
}
