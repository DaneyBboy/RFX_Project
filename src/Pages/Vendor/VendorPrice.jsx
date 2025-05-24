import { FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import BasicModal from "../../Components/BasicModal";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function VendorPriceBid() {
  const { rfxNumber } = useParams();
  const [user, setUser] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({ name: decodedToken.name, email: decodedToken.email });
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/price/getprice/${rfxNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const results = await response.json();
        // Extract items from the first object in the array
        setFormData(results[0]?.items || []);
      } catch (error) {
        console.error("Error fetching items:", error);
        setFormData([]); // Fallback to empty array on error
      }
    };
    fetchItems();
  }, [rfxNumber]);

  const handleChange = (index, e) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedData = [...prev];
      updatedData[index].unitRate = value;
      updatedData[index].totalPrice = (updatedData[index].quantity * parseFloat(value || 0)).toFixed(2);
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    const payload = {
      rfxNumber,
      name: user.name,
      email: user.email,
      items: formData.map(({ Srno, itemName, description, quantity, uom, unitRate, totalPrice }) => ({
        Srno,
        itemName,
        description,
        quantity,
        uom,
        unitRate: parseFloat(unitRate) || 0,
        totalPrice: parseFloat(totalPrice) || 0
      }))
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/price/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Failed to submit bid");
      alert("Bid submitted successfully!");
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid");
    }
    setModalOpen(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Vendor Price Bid Submission</h3>
      <p><strong>Vendor:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <FormControl>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>UOM</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.Srno}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell>
                    <TextField
                      name="unitRate"
                      value={item.unitRate || ""}
                      onChange={(e) => handleChange(index, e)}
                      type="number"
                    />
                  </TableCell>
                  <TableCell>{isNaN(item.totalPrice) ? "0.00" : item.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="secondary" style={{ marginTop: "10px" }} onClick={handleSubmit}>
          Submit Bid
        </Button>
      </FormControl>
      <BasicModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  );
}