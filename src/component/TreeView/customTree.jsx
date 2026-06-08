import React, { useEffect, useState } from 'react';
import { fetchTree } from '../Services/tree.service';
import BusinessIcon from '@mui/icons-material/Business';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  List,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';

const CustomTree = ({ handleMenuItemClick }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [editingLabelId, setEditingLabelId] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [data, setData] = useState([]);
  const [openParent, setOpenParent] = useState(false);
  const [isSelected, setIsSelected] = useState(null);
  const [items, setItems] = useState(null);

  const fetchTreeStructure = async () => {
    try {
      const data = await fetchTree();
      setData(data.result);
      const items = [
        {
          id: 1,
          label: 'Custom View',
          type: 'site',
          children: data?.result?.map((location, index) => ({
            id: index,
            label: location,
            value: location,
            type: 'location',
            meter: { parent: 'Custom Flooring' }
          }))
        }
      ];
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleParentToggle = () => {
    setOpenParent(!openParent);
  };

  const handleClick = (val, id, meter) => {
    setIsSelected(val);
    setSelectedMenuItem(id);
    handleMenuItemClick(val, id, meter);
  };

  const handleLabelEdit = (child) => {
    setEditingLabelId(child.id);
    setNewLabel(child.label);
  };

  const handleLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleLabelSave = (child) => {
    const updatedItems = items.map(item => ({
      ...item,
      children: item.children.map(c =>
        c.id === child.id ? { ...c, label: newLabel } : c
      )
    }));
    setItems(updatedItems);
    setEditingLabelId(null);
  };

  const renderIcon = (val) => {
    switch (val) {
      case 'facility':
        return <BusinessIcon />;
      case 'floor':
        return <StorefrontIcon />;
      case 'location':
        return <LocationOnIcon />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchTreeStructure();
    };
    init();
  }, []);

  return (
    <List>
      {items?.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem disablePadding>
            <ListItemButton onClick={handleParentToggle} sx={{ display: 'flex', gap: '20px', marginLeft: '12px' }}>
              {openParent ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
              <Typography sx={{ fontWeight: 'bold', fontSize: 18 }} > {item.label}</Typography>
            </ListItemButton>
          </ListItem>
          <Collapse in={openParent} timeout="auto" unmountOnExit>
            <List component="div" sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {item?.children?.map((child) => (
                <ListItem
                  // button
                  key={child.id}
                  onClick={() => handleClick(child.value, child.id, child.meter)}
                  sx={{
                    backgroundColor: isSelected === child.value ? 'rgba(207, 174, 255, 0.2)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(188, 187, 187, 0.5)'
                    },
                    display: 'flex',
                    gap: '20px',
                    pl: 4,
                    ml: 5,
                    width: '88%'
                  }}
                >
                  {renderIcon(child.type)}
                  <Typography>
                    {child.label}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default CustomTree;
