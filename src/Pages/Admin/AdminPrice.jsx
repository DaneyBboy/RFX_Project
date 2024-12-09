import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";

export default function AdminPrice() {
  let priceData = [{
    sr: 1,
    name: "Laptop",
    description: "4GB RAM 1TB SSD",
    quantity: "50",
    uom: "Per Unit",
  },
  {sr: 2,
  name: "Desktop",
  description: "8GB RAM 1TB SSD",
  quantity: "10",
  uom: "Per Unit",
},
{sr: 3,
  name: "Dell Workstation",
  description: "16GB RAM 2TB SSD",
  quantity: "5",
  uom: "Per Unit",
}]
  let data = priceData;

  return (
    <div>
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
            {data.map((item) => ( 
              <TableRow>
                <TableCell>
                  <TextField value={item.sr}  multiline minRows={1} variant="outlined" >
                    
                    </TextField>
                </TableCell>
                <TableCell>
                  <TextField value={item.name}
                    multiline
                    minRows={1}
                    variant="outlined"
                  ></TextField>
                </TableCell>
                <TableCell>
                  <TextField value={item.description}
                    multiline
                    minRows={1}
                    variant="outlined"
                  ></TextField>
                </TableCell>
                <TableCell>
                  <TextField value={item.quantity}
                    multiline
                    minRows={1}
                    variant="outlined"
                  ></TextField>
                </TableCell>
                <TableCell>
                  <TextField value={item.uom}
                    multiline
                    minRows={1}
                    variant="outlined"
                  ></TextField>
                </TableCell>
              </TableRow> ))}
              
             
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
