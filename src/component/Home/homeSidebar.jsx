import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { List } from '@mui/material';
import TreeSyd from '../TreeView/treeSyd';
import TreeCustom from '../TreeView/customTree'

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ open, component, handleOpen, handleMenuClick, handleNodeClickValue }) {
  const theme = useTheme();
  const navigateRoComp = "home/componentOne"
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [comp, setComp] = React.useState()
  const navigate = useNavigate();

  const handleMenuItemClick = (value, index, node) => {
    setSelectedValue(value);
    setSelectedMenuItem(index); 
    const solar_navigation = [
      { id: 1, label: 'Energy Distribution', value: '' },
    ];
    
    if (value === 'Energy_Distribution_LNT') {     
      const selected = solar_navigation.find((item) => item.label === value);
      handleMenuClick(index, selected.value, node);
      if (selected) {
        sessionStorage.setItem('selectedValue', selected.value);
        sessionStorage.setItem('selectedMenuItem', index.toString());
        navigate(`/home/${selected.value}`, { state: selected.value });
      }
    }
    else {
      handleMenuClick(index, value, node);
      sessionStorage.setItem('selectedValue', value);
      sessionStorage.setItem('selectedMenuItem', index.toString());
      sessionStorage.setItem('floorK',node.parent)
      sessionStorage.setItem('component', node?.parent);
      navigate(`/${navigateRoComp}`, { state: value });
    }
  };

  const handleLogoClick = () => {
    sessionStorage.removeItem('selectedValue');
    setComp('');
    navigate("/home");
  };

  React.useEffect(() => {
    setComp(component);
  }, [component])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(236,239,243,0.8)',
            boxShadow: 'none',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ marginTop: '125px', marginLeft: '15px' }}>
          {/* <Typography variant="h5" textAlign='center' component="div" fontWeight='bold' onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>フジタ技術センター</Typography> */}
        </Box>
        <Divider />
        <Box>
          <TreeSyd handleNodeClickValue={handleNodeClickValue} handleMenuItemClick={handleMenuItemClick} />
          <TreeCustom handleMenuItemClick={handleMenuItemClick} />
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
