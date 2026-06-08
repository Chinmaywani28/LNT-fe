import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AiOutlineTablet } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdAddLocation } from "react-icons/md";
import "./sidebar.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ isOpen, item }) {
  const role = sessionStorage.getItem('role');
  const [open, setOpen] = React.useState(true);
  const [selectedListItem, setselectedListItem] = React.useState(item || 2);
  const [selectedItem, setSelectedItem] = React.useState(
    "/setting/devices"
  );
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    isOpen(true);
  };

  const handleListItemClick = (itemId) => {
    setselectedListItem(itemId);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const isItemSelected = (item) => {
    return selectedItem === item;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/')
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 1, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        sx={{
          width: drawerWidth,
          height: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#ECEFF3",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <Typography
            varient="h6"
            fontWeight="bold"
            fontSize="30px"
            sx={{
              marginLeft: "20px",
              textAllign: "left",
              marginTop: "30px",
            }}
          >
            Settings
          </Typography>
        </DrawerHeader>
        <List
          sx={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100%",
            width: 185
          }}
        >
          <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 2 ? "selected" : ""}`}
            onClick={() => handleListItemClick(2)}
          >
            <ListItemButton
              component={Link}
              to="/setting/devices"
              selected={isItemSelected("/setting/devices")}
              onClick={() => handleItemClick("/setting/devices")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                },
              }}
              disabled={isItemSelected("/setting/devices")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 2 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <AiOutlineTablet
                  fontSize={24}
                  className={`list-button ${selectedListItem === 2 ? "selected" : ""
                    }`}
                />
              </IconButton>
              <ListItemText
                primary="Device"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 2 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 3 ? "selected" : ""}`}
            onClick={() => handleListItemClick(3)}
          >
            <ListItemButton
              component={Link}
              to="/setting/addcustomlocation"
              selected={isItemSelected("/setting/addcustomlocation")}
              onClick={() => handleItemClick("/setting/addcustomlocation")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                },
              }}
              disabled={isItemSelected("/setting/addcustomlocation")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 3 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <MdAddLocation 
                  fontSize={24}
                  className={`list-button ${selectedListItem === 3 ? "selected" : ""
                    }`}
                />
              </IconButton>
              <ListItemText
                primary="Custom Location"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 3 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          {role === 'ADMIN' ? <Box>
            <ListItem
              disablePadding
              className={`list-item ${selectedListItem === 6 ? "selected" : ""}`}
              onClick={() => handleListItemClick(6)}
            >
              <ListItemButton
                component={Link}
                to="/setting/security"
                selected={isItemSelected("/setting/security")}
                onClick={() => handleItemClick("/setting/security")}
                sx={{
                  "&:hover, &.Mui-selected": {
                    borderRadius: "10px",
                    background: "#ffffff",
                    fontWeight: "bold",
                  },
                  "&.Mui-disabled": {
                    opacity: 1,
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                  },
                }}
                disabled={isItemSelected("/security")}
              >
                <IconButton
                  sx={{
                    fontWeight: selectedListItem === 6 ? "bold" : "normal",
                    marginRight: "10px",
                  }}
                  disabled
                >
                  <IoSettingsOutline
                    fontSize={24}
                    className={`list-button ${selectedListItem === 6 ? "selected" : ""
                      }`}
                  />
                </IconButton>
                <ListItemText
                  primary="Security"
                  primaryTypographyProps={{
                    fontWeight: selectedListItem === 6 ? "700" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Box> : null}
          <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 7 ? "selected" : ""}`}
            onClick={() => handleListItemClick(7)}
            sx={{ position: "absolute", bottom: 20 }}
          >
            <ListItemButton
              component={Link}
              to="/"
              selected={isItemSelected("/")}
              onClick={handleLogout}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                  width: "200px",
                },
                "&.Mui-disabled": {
                  opacity: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                },
              }}
              disabled={selectedListItem === 7}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 7 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <AiOutlinePoweroff
                  fontSize={24}
                  className={`list-button ${selectedListItem === 7 ? "selected" : ""
                    }`}
                />
              </IconButton>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 7 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
