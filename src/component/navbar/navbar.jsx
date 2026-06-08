import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useBarContext } from "../context/barcontext";
import { ReactComponent as Logo } from '../config/svgfiles/EnvirOptimus_Logo_WithoutBG (2).svg';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeableEdgeDrawer from "../Energy/components/swipeBox";
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const Navbar = ({ handleOpen, selectedMenuItem, openDrawer, component, toggleBoxVisibility, isBoxVisible, floorKey }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedMenu, setSelectedMenuItem] = useState(selectedMenuItem);
  const [selectedValue, setSelectedValue] = useState(component);
  const [comp, setComp] = useState(component);
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  const { barData, updateBarData } = useBarContext();

  const handlecards = () => {
    updateBarData(!barData);
  };

  const handleSettingsClick = () => {
    navigate("/setting/devices");
  };

  const handleGadget = () => {
    if (component) {
      const state = {
        key: component,
      };
      navigate("/addgadgets", { state });
    } else {
      alert("Please select a menu item");
    }
  };

  useEffect(() => {
    const storedValue = sessionStorage.getItem("selectedValue");
    const storedMenuItem = sessionStorage.getItem("selectedMenuItem");

    if (storedMenuItem !== null && storedMenuItem !== undefined) {
      setSelectedMenuItem(parseInt(storedMenuItem, 10));
    }

    if (storedValue !== null && storedValue !== undefined) {
      setSelectedValue(component);
    }
  }, [selectedValue, component]);

  useEffect(() => {
    if (selectedMenuItem !== null && selectedMenuItem !== undefined) {
      setSelectedMenuItem(selectedMenuItem);
    }
  }, [selectedMenuItem, openDrawer]);

  const Puller = styled('div')(({ theme }) => ({
    transition: "all 10s ease-in-out",
    transform: isBoxVisible ? 'translateY(0)' : 'translateY(-100%)',
    width: 30,
    height: 6,
    backgroundColor: grey[500],
    borderRadius: 3,
    position: 'absolute',
    top: isBoxVisible ? 500 + 150 : 115,
    left: 'calc(50% - 25px)',
    ...theme.applyStyles('dark', {
      backgroundColor: grey[900],
    }),
    cursor: 'pointer',
  }));

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    slidingBox: {
      transition: "0.5s ease-in-out",
      backgroundColor: "transparent",
      width: "100%",
      opacity: isBoxVisible ? 1 : 0,
      transform: isBoxVisible ? 'translateY(0)' : 'translateY(-10%)'
    },
  };

  const handleLogoClick = () => {
    sessionStorage.removeItem('selectedValue');
    setComp('');
    navigate("/home");
  };

  useEffect(() => {
    setComp(component);
  }, [component])

  return (
    <div>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "space-between",
          padding: "30px",
          position: "fixed",
          top: 0,
          width: openDrawer ? "calc(100% - 300px)" : "100%",
          zIndex: 1000,
          heigth: 130
        }}
      >
        <Box sx={{ display: 'flex', gap: '45px', marginLeft : '25px' }}>
          <Box sx={{ position: "relative", top: 15,}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => handleOpen((prev) => !prev)}
              edge="start"
              sx={[open && { display: "none" }]}
            >
              {openDrawer ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Box
             sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: 'flex-start',
              margin: 'auto',
              flexWrap: 'wrap',
              gap : '10px',
              // border : '1px solid black'
            }}
          >
            {/* <Logo style={{ margin: 0, padding: 0, display: 'block', width: '400', height: '79', marginLeft: -15, marginTop: -38, top: 20, position: 'relative', cursor: 'pointer' }} onClick={handleLogoClick} /> */}
            <Logo style={{ margin : 0, padding : 0, display : 'flex',width: 400, height: 80, marginLeft : -56, marginTop : -35, top : 15, position : 'relative', cursor: 'pointer',  }} onClick={handleLogoClick} />
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "flex-start",
                left: 0,top : 7
              }}
            >
              {/* {comp && comp !== 'Energy_Distribution_KoKo' ? <Typography sx={{ textAlign: "left", display: 'flex', gap: '5px' }}>
                あなたの カスタマイズ ダッシュボード について{" "}
                <Typography>{selectedValue}</Typography>
              </Typography> : <Typography textAlign="left">毎月のエネルギー配分</Typography>} */}
              {comp ? (
                <Typography sx={{ textAlign: "left", display: 'flex', gap: '5px' }}>
                  Dashboard{" "}
                  <Typography component="span">{selectedValue}</Typography>
                </Typography>
              ) : (
                <Typography textAlign="left">Energy allocation</Typography>
              )}

            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "15px", marginRight: 3 }}>
          {((comp && role === 'ADMIN') ||
            (floorKey === 'カスタム・フロア')) ? <Box sx={{ display: "flex", gap: "15px" }}><Button
              variant="contained"
              color="inherit"
              sx={{
                background: "#FFFFFF",
                border: styles.thinBorder,
                margin: "auto",
              }}
              onClick={handleGadget}
            >
              <AddIcon />
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                background: "#FFFFFF",
                border: styles.thinBorder,
                margin: "auto",
              }}
              onClick={handlecards}
            >
              <TuneIcon sx={{ transform: "rotate(90deg)" }} />
            </Button> </Box> : null}
          <Button
            variant="contained"
            color="inherit"
            sx={{
              background: "#FFFFFF",
              border: styles.thinBorder,
              margin: "auto",
            }}
            onClick={handleSettingsClick}
          >
            <SettingsOutlinedIcon />
          </Button>
          <Box>
            {!isBoxVisible && comp && comp !== 'Energy Distribution KoKo' && <Puller onClick={() => toggleBoxVisibility()} />}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
