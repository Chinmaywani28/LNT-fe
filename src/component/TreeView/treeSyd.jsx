import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessIcon from '@mui/icons-material/Business';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import siteData from './newTree.json';
import { Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Box sx={{ color: 'red', padding: 2 }}>Something went wrong.</Box>;
    }
    return this?.props?.children;
  }
}

const transformData = (data) => {
  try {
    const result = [];
    const { Facilities } = data?.Site || {};

    if (Facilities) {
      result.push({
        id: 'site',
        label: data?.Site?.Name,
        type: 'site',
        children: Facilities?.map((facility, index) => {
          const facilityId = `facility-${index}`;
          return {
            id: facilityId,
            label: facility?.Name,
            type: 'facility',
            children: facility?.Floors?.map((floor, floorIndex) => {
              const floorId = `${facilityId}-floor-${floorIndex}`;
              return {
                id: floorId,
                
                label: `${floor.Floor_Number}`,
                type: 'floor',
                children: floor?.Location?.map((location, locationIndex) => ({
                  id: `${floorId}-location-${locationIndex}`,
                  label: location?.Name,
                  type: 'location',
                  parent:`${facility?.Name}_${floor.Floor_Number}_${location.Name}`,
                })),
              };
            }),
          };
        }),
      });
    }
    return result;
  } catch (error) {
    console.error('Error in transforming site data:', error);
    return [];
  }
};

const SITE_STRUCTURE = transformData(siteData);
// const TreeNode = ({ node, expandedNodeIds, onNodeClick, onLeafClick, selectedNodeId }) => {
//   const isExpanded = expandedNodeIds.includes(node.id);
//   const isSelected = selectedNodeId === node.id;

//   const handleClick = () => {
//     if (node.children) {
//       onNodeClick(node.id);
//     } else {
//       onLeafClick(node);
//     }
//   };

//   const renderIcon = () => {
//     switch (node.type) {
//       case 'site':
//         return null;
//       case 'facility':
//         return <BusinessIcon />;
//       case 'floor':
//         return <StorefrontIcon />;
//       case 'location':
//         return <LocationOnIcon />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <List>
//       <ListItem
//         button
//         onClick={handleClick}
//         sx={{
//           backgroundColor: isSelected ? 'rgba(207, 174, 255, 0.28)' : 'transparent',
//           '&:hover': {
//             backgroundColor: 'rgba(188, 187, 187, 0.5)',
//           },
//           display: 'flex',
//           gap: '20px',
//         }}
//       >
//         {node.children && (isExpanded ? <ExpandLess /> : <KeyboardArrowRightIcon />)}
//         {renderIcon()}
//         <Typography sx={{ fontWeight: node.type === 'site' ? 'bold' : 'normal', fontSize : node.type === 'site' ? 18 : 'normal' }} > {node.label}</Typography>
//       </ListItem>

//       {isExpanded && node?.children && (
//         <Box sx={{ pl: 4 }}>
//           {node?.children?.map((child) => (
//             <TreeNode
//               key={child.id}
//               node={child}
//               expandedNodeIds={expandedNodeIds}
//               onNodeClick={onNodeClick}
//               onLeafClick={onLeafClick}
//               selectedNodeId={selectedNodeId}
//             />
//           ))}
//         </Box>
//       )}
//     </List>
//   );
// };
const TreeNode = ({
  node,
  expandedNodeIds,
  onNodeClick,
  onLeafClick,
  selectedNodeId,
  level = 0, // depth level
}) => {
  const isExpanded = expandedNodeIds.includes(node.id);
  const isSelected = selectedNodeId === node.id;

  const handleClick = () => {
    if (node.children) {
      onNodeClick(node.id);
    } else {
      onLeafClick(node);
    }
  };

  const renderIcon = () => {
    switch (node.type) {
      case "site":
        return null;
      case "facility":
        return <BusinessIcon />;
      case "floor":
        return <StorefrontIcon />;
      case "location":
        return <LocationOnIcon />;
      default:
        return null;
    }
  };

  return (
    <List disablePadding>
      <ListItem
        button
        onClick={handleClick}
        sx={{
          backgroundColor: isSelected
            ? "rgba(207, 174, 255, 0.28)"
            : "transparent",
          "&:hover": { backgroundColor: "rgba(188, 187, 187, 0.5)" },
          display: "flex",
          alignItems: "center",
          position: "relative",
          gap: '20px',
          pl: `${level * 20 + 10}px`, // indent based on depth
        }}
      >
        {/* ┃ Vertical Line */}
        {level > 0 && (
          <Box
            sx={{
              position: "absolute",
              left: `${level * 20 - 6}px`,
              top: 0,
              bottom: 0,
              width: "1px",
              bgcolor: "#d0d0d0",
            }}
          />
        )}

        {/* ┣ or ┗ Connector Line */}
        {level > 0 && (
          <Box
            sx={{
              width: "14px",
              height: "1px",
              bgcolor: "#d0d0d0",
              position: "absolute",
              left: `${level * 20 - 6}px`,
            }}
          />
        )}

        {node.children &&
          (isExpanded ? <ExpandLess /> : <KeyboardArrowRightIcon />)}

        {renderIcon()}

        <Typography
          sx={{
            fontWeight: node.type === "site" ? "bold" : "normal",
            fontSize: node.type === "site" ? 18 : "normal",
            ml: 1,
          }}
        >
          {node.label}
        </Typography>
      </ListItem>

      {isExpanded && node.children && (
        <Box>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              expandedNodeIds={expandedNodeIds}
              onNodeClick={onNodeClick}
              onLeafClick={onLeafClick}
              selectedNodeId={selectedNodeId}
              level={level + 1} // increase depth
            />
          ))}
        </Box>
      )}
    </List>
  );
};
export default function TreeViewComponent({ handleNodeClickValue, handleMenuItemClick }) {
  const [expandedNodeIds, setExpandedNodeIds] = React.useState([]);
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);

  const handleNodeClick = (nodeId) => {
    setExpandedNodeIds((prevExpandedNodeIds) =>
      prevExpandedNodeIds?.includes(nodeId)
        ? prevExpandedNodeIds.filter(id => id !== nodeId)
        : [...prevExpandedNodeIds, nodeId]
    );
  };

  const handleLeafClick = (node) => {

    handleNodeClickValue(node?.label);
    handleMenuItemClick(node?.label,0,node);
    // handleMenuItemClick(node.label, 0);
    setSelectedNodeId(node?.id);
  };

  return (
    <ErrorBoundary>
      <Box sx={{  width: 275, margin: 'auto' }}>
        {SITE_STRUCTURE?.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            expandedNodeIds={expandedNodeIds}
            onNodeClick={handleNodeClick}
            onLeafClick={handleLeafClick}
            selectedNodeId={selectedNodeId}
          />
        ))}
      </Box>
    </ErrorBoundary>
  );
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import BusinessIcon from '@mui/icons-material/Business';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import siteData from './sydnew.json';
// import { useMemo } from "react";

// // Error Boundary to Catch Errors
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null, errorInfo: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     this.setState({ error, errorInfo });
//     console.error('ErrorBoundary caught an error', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <Box sx={{ color: 'red', padding: 2 }}>Something went wrong.</Box>;
//     }
//     return this.props.children;
//   }
// }

// // Transform Data with Unique Keys
// const transformData = (data) => {
//   try {
//     const result = [];
//     const { Facilities } = data?.Site || {};

//     if (Facilities) {
//       result.push({
//         id: `site-${data.Site.Name}`, // Ensure unique ID
//         label: data?.Site?.Name,
//         type: 'site',
//         children: Facilities?.map((facility, index) => {
//           const facilityId = `facility-${facility.Name}-${index}`;
//           return {
//             id: facilityId,
//             label: facility?.Name,
//             type: 'facility',
//             children: facility?.Floors?.map((floor, floorIndex) => {
//               const floorId = `${facilityId}-floor-${floor.Floor_Number}-${floorIndex}`;
//               return {
//                 id: floorId,
//                 label: `${floor.Floor_Number}`,
//                 type: 'floor',
//                 children: floor?.Location?.map((location, locationIndex) => ({
//                   id: `${floorId}-location-${location.Name}-${locationIndex}`,
//                   label: location?.Name,
//                   type: 'location',
//                   parent: `${floor.Floor_Number}_${location.Name}`,
//                 })),
//               };
//             }),
//           };
//         }),
//       });
//     }
//     return result;
//   } catch (error) {
//     console.error('Error in transforming site data:', error);
//     return [];
//   }
// };


// const TreeNode = ({ node, expandedNodeIds, onNodeClick, onLeafClick, selectedNodeId }) => {
//   const isExpanded = expandedNodeIds.includes(node.id);
//   const isSelected = selectedNodeId === node.id;

//   const handleClick = () => {
//     if (node.children) {  
//       onNodeClick(node.id);
//     } else {
//       onLeafClick(node);
//     }
//   };

//   const renderIcon = () => {
//     switch (node.type) {
//       case 'site':
//         return null;
//       case 'facility':
//         return <BusinessIcon />;
//       case 'floor':
//         return <StorefrontIcon />;
//       case 'location':
//         return <LocationOnIcon />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <List disablePadding>
//       <ListItem
//         button
//         onClick={handleClick}
//         sx={{
//           backgroundColor: isSelected ? 'rgba(207, 174, 255, 0.28)' : 'transparent',
//           '&:hover': {
//             backgroundColor: 'rgba(188, 187, 187, 0.5)',
//           },
//           display: 'flex',
//           gap: '20px',
//         }}
//       >
//         {node.children && (isExpanded ? <ExpandLess /> : <KeyboardArrowRightIcon />)}
//         {renderIcon()}
//         <ListItemText primary={node.label} />
//       </ListItem>

//       {/* Conditional Rendering for Children */}
//       {isExpanded && node?.children && (
//         <Box sx={{ pl: 4 }}>
//           {node.children.map((child) => (
//             <TreeNode
//               key={child.id}
//               node={child}
//               expandedNodeIds={expandedNodeIds}
//               onNodeClick={onNodeClick}
//               onLeafClick={onLeafClick}
//               selectedNodeId={selectedNodeId}
//             />
//           ))}
//         </Box>
//       )}
//     </List>
//   );
// };

// // export default function TreeViewComponent({ handleNodeClickValue, handleMenuItemClick }) {
// //   const [expandedNodeIds, setExpandedNodeIds] = React.useState([]);
// //   const [selectedNodeId, setSelectedNodeId] = React.useState(null);

// //   // Handles Click on Parent Node
// //   const handleNodeClick = (nodeId) => {
// //     setExpandedNodeIds((prevExpandedNodeIds) =>
// //       prevExpandedNodeIds.includes(nodeId)
// //         ? prevExpandedNodeIds.filter((id) => id !== nodeId)
// //         : [...prevExpandedNodeIds, nodeId]
// //     );
// //   };

// //   // Handles Click on Leaf Node
// //   const handleLeafClick = (node) => {
// //     console.log(node, 'node');
// //     handleNodeClickValue(node?.label);
// //     handleMenuItemClick(node?.label, 0, node);
// //     setSelectedNodeId(node?.id);
// //   };

// //   return (
// //     <ErrorBoundary>
// //       <Box sx={{ width: 275, margin: 'auto' }}>
// //         {SITE_STRUCTURE.map((node) => (
// //           <TreeNode
// //             key={node.id}
// //             node={node}
// //             expandedNodeIds={expandedNodeIds}
// //             onNodeClick={handleNodeClick}
// //             onLeafClick={handleLeafClick}
// //             selectedNodeId={selectedNodeId}
// //           />
// //         ))}
// //       </Box>
// //     </ErrorBoundary>
// //   );
// // }

// export default function TreeViewComponent({ handleNodeClickValue, handleMenuItemClick }) {
//   const [expandedNodeIds, setExpandedNodeIds] = React.useState([]);
//   const [selectedNodeId, setSelectedNodeId] = React.useState(null);

//   // Use useMemo inside the component
//   const SITE_STRUCTURE = React.useMemo(() => transformData(siteData), [siteData]);

//   const handleNodeClick = (nodeId) => {
//     setExpandedNodeIds((prevExpandedNodeIds) =>
//       prevExpandedNodeIds.includes(nodeId)
//         ? prevExpandedNodeIds.filter((id) => id !== nodeId)
//         : [...prevExpandedNodeIds, nodeId]
//     );
//   };

//   const handleLeafClick = (node) => {
//     console.log(node, 'node');
//     handleNodeClickValue(node?.label);
//     handleMenuItemClick(node?.label, 0, node);
//     setSelectedNodeId(node?.id);
//   };

//   return (
//     <ErrorBoundary>
//       <Box sx={{ width: 275, margin: 'auto' }}>
//         {SITE_STRUCTURE?.length > 0 && SITE_STRUCTURE?.map((node) => (
//           <TreeNode
//             key={node.id}
//             node={node}
//             expandedNodeIds={expandedNodeIds}
//             onNodeClick={handleNodeClick}
//             onLeafClick={handleLeafClick}
//             selectedNodeId={selectedNodeId}
//           />
//         ))}
//       </Box>
//     </ErrorBoundary>
//   );
// }
