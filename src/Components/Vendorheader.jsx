import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Link, useNavigate } from "react-router-dom";
import "../App";
import LogoutIcon from "@mui/icons-material/Logout";
import { LoginContext } from "../Context/Context";
import HomeIcon from "@mui/icons-material/Home";


export default function Vendorheader() {
  const { logout } = React.useContext(LoginContext);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h6" component="div">
            RFx Engine
          </Typography>
          <Button onClick={handleClick} color="inherit">
            <HomeIcon />
          </Button>
          <Link className="link" to="/listrfx">
            <Button color="inherit">
              {" "}
              <FormatListBulletedIcon /> RFx Listing
            </Button>
          </Link>
          {/* <Link className="link" to="/rfxSubmit">
            <Button color="inherit">
              {" "}
              <FeedIcon /> RFx Submission
            </Button>
          </Link>
          <Link className="link" to="/rfxstatus">
            <Button color="inherit">
              {" "}
              <GridViewIcon /> RFx Status
            </Button>
          </Link> */}

          <Button onClick={() => logout()} color="inherit">
            <LogoutIcon onClick={handleClick} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
