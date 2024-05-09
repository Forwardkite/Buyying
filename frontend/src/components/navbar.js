"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const pathname = usePathname();
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          position="sticky"
          className="bg-white text-theme py-2 md:py-6 px-0"
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters className="w-full flex justify-between">
              <Link href="/">
                <img
                  src="/assets/img/Buyyinn-logo.png"
                  className="h-[40px] w-auto"
                  alt=""
                />
              </Link>

              <Box
                className="text-theme"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Play</Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Box
                sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
                className="text-theme justify-between w-[400px]"
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Play
                </Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Draws
                </Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Products
                </Button>
                <Button>
                  <Link
                    href="/dashboard/donations"
                    className={`flex link text-theme ${
                      pathname === "/dashboard/donations" ? "active" : ""
                    }`}
                  >
                    <span className="ms-2">Donations</span>
                  </Link>
                </Button>
                <Box sx={{ flexGrow: 0 }} className="text-theme">
                  <Tooltip title="Open Profile">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        href="/profile"
                        className={`flex link text-theme ${
                          pathname === "/profile" ? "active" : ""
                        }`}
                      >
                        <Typography textAlign="center">Profile</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
