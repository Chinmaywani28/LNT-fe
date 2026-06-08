import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import NodeInfo from "../node/NodeInfo";
import NodewayCard from "../node/nodeCard";
import EditNode from "../node/EditNode";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import Loading from "../Loading/loading";
import { FixedSizeGrid, FixedSizeList } from "react-window";

function AllNodes({ allNodes, fetchSingleNode, errorMessage, sydNodes, kokoNodes }) {
  // const [filterNode, setFilterNode] = useState([]);
  const [selectedNode, setselectedNode] = useState(null);
  const [singleNode, setSingleNode] = useState("");
  const [editClick, setEditClick] = useState(false);
  const [nodeInfo, setNodeInfo] = useState(null);
  const [status, setStatus] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [site, setSite] = useState(null);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIsClickedNode = (nodeClick) => {
    setselectedNode(nodeClick);
  };

  const handleEditInfo = (click) => {
    setEditClick(click);
  };

  const getSingleNode = (key) => {
    const node = fetchSingleNode(key);
    setSingleNode(node);
  };

  const filterNode = useMemo(() => {
    if (site === "TC-4") return sydNodes;
    if (site === "TC-5") return kokoNodes;
    return allNodes;
  }, [site, allNodes, sydNodes, kokoNodes]);

  if (!allNodes) {
    return <Loading />;
  }

  if (errorMessage) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', justifyContent: 'center', gap: '10px', alignItems: 'center', color: "#757676", margin: 'auto', height: "80vh", }}>
      <WifiOffIcon className="temperature-icon" width={300} height={300} />  <Typography variant="h4" fontWeight="bold">
        Offline
      </Typography>
    </Box>;
  }

  return (
    <div>
      <Box>
        {editClick ? (
          <EditNode data={singleNode} handleEditInfo={handleEditInfo} />
        ) : (
          <Box>
            {!selectedNode ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                  fontSize="28px"
                  marginLeft="20px"
                >
                  Total {site ? filterNode?.length : allNodes?.length} Nodes
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    height: "70%",
                    marginLeft: "auto",
                    marginRight: "70px",
                  }}
                  onClick={handleClick}
                >
                  Filter
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  {["All", "TC-4", "TC-5"].map((label) => (
                    <MenuItem key={label} onClick={() => setSite(label)}>{label}</MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box></Box>
            )}
            <Box>
              {selectedNode ? (
                <NodeInfo
                  data={singleNode}
                  handleIsClickedNode={handleIsClickedNode}
                  handleEditInfo={handleEditInfo}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                    animation: "fadeIn 3s",
                    padding: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "70px",
                    }}
                  >
                    {filterNode?.map((data) => (
                      <Box
                        key={data?.node_mac}
                        sx={{
                          maxWidth: "calc(33.333% - 16px)",
                          minWidth: "325px",
                        }}
                      >
                        <NodewayCard
                          data={data}
                          handleIsClickedNode={handleIsClickedNode}
                          getSingleNode={getSingleNode}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
      {/* } */}
    </div>
  );
}

export default React.memo(AllNodes);


// import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
// import React, { useEffect, useMemo, useState } from "react";
// import NodeInfo from "../node/NodeInfo";
// import NodewayCard from "../node/nodeCard";
// import EditNode from "../node/EditNode";
// import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
// import Loading from "../Loading/loading";
// import { FixedSizeGrid } from "react-window";
// import './custom.css'

// function AllNodes({ allNodes, fetchSingleNode, errorMessage, sydNodes, kokoNodes }) {
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [singleNode, setSingleNode] = useState("");
//   const [editClick, setEditClick] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [site, setSite] = useState(null);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleIsClickedNode = (nodeClick) => setSelectedNode(nodeClick);
//   const handleEditInfo = (click) => setEditClick(click);

//   const getSingleNode = (key) => {
//     const node = fetchSingleNode(key);
//     setSingleNode(node);
//   };

//   const filterNode = useMemo(() => {
//     if (!site || site === "All") return allNodes;
//     return site === "SYD" ? sydNodes : kokoNodes;
//   }, [site, allNodes, sydNodes, kokoNodes]);

//   if (!allNodes) return <Loading />;

//   if (errorMessage) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           fontWeight: "bold",
//           justifyContent: "center",
//           gap: "10px",
//           alignItems: "center",
//           color: "#757676",
//           margin: "auto",
//           height: "80vh",
//         }}
//       >
//         <WifiOffIcon className="temperature-icon" width={300} height={300} />
//         <Typography variant="h4" fontWeight="bold">
//           Offline
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <div>
//       <Box sx={{ overflow: 'hidden' }}>
//         {editClick ? (
//           <EditNode data={singleNode} handleEditInfo={handleEditInfo} />
//         ) : (
//           <Box sx={{ overflow: 'hidden' }}>
//             {!selectedNode ? (
//               <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   textAlign="left"
//                   fontSize="28px"
//                   marginLeft="20px"
//                 >
//                   合計 {site ? filterNode?.length : allNodes?.length} ノード
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   sx={{ height: "70%", marginLeft: "auto", marginRight: "70px" }}
//                   onClick={handleClick}
//                 >
//                   フィルター
//                 </Button>
//                 <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//                   {["All", "SYD", "志"].map((label) => (
//                     <MenuItem
//                       key={label}
//                       onClick={() => {
//                         setSite(label);
//                         handleClose();
//                       }}
//                     >
//                       {label}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </Box>
//             ) : (
//               <Box></Box>
//             )}
//             {
//               selectedNode ? <NodeInfo
//                 data={singleNode}
//                 handleIsClickedNode={handleIsClickedNode}
//                 handleEditInfo={handleEditInfo}
//               /> : <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   width: "100%",
//                   animation: "fadeIn 3s",
//                   padding: "20px",
//                 }}
//               >
//                 <FixedSizeGrid
//                   columnCount={4}
//                   columnWidth={390}
//                   height={window.innerHeight - 100}
//                   rowCount={Math.ceil(filterNode.length / 4)}
//                   rowHeight={285}
//                   width={window.innerWidth - 100}
//                   className="custom-grid" // CSS class for hiding scrollbar
//                 >
//                   {({ columnIndex, rowIndex, style }) => {
//                     const index = rowIndex * 4 + columnIndex;
//                     if (index >= filterNode.length) return null;
//                     const data = filterNode[index];

//                     return (
//                       <div style={style}>
//                         <NodewayCard
//                           data={data}
//                           handleIsClickedNode={handleIsClickedNode}
//                           getSingleNode={getSingleNode}
//                         />
//                       </div>
//                     );
//                   }}
//                 </FixedSizeGrid>
//               </Box>
//             }
//           </Box>
//         )}
//       </Box>
//     </div>
//   );
// }

// export default React.memo(AllNodes);


// import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
// import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
// import NodeInfo from "../node/NodeInfo";
// import NodewayCard from "../node/nodeCard";
// import EditNode from "../node/EditNode";
// import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
// import Loading from "../Loading/loading";

// function AllNodes({ allNodes, fetchSingleNode, errorMessage, sydNodes, kokoNodes }) {
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [singleNode, setSingleNode] = useState("");
//   const [editClick, setEditClick] = useState(false);
//   const [site, setSite] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Pagination state
//   const [page, setPage] = useState(1);
//   const PAGE_SIZE = 50; // Load 30 items per page
//   const observer = useRef(null);

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleIsClickedNode = (nodeClick) => setSelectedNode(nodeClick);
//   const handleEditInfo = (click) => setEditClick(click);

//   const getSingleNode = (key) => {
//     const node = fetchSingleNode(key);
//     setSingleNode(node);
//   };

//   // Filter nodes based on site selection
//   const filteredNodes = useMemo(() => {
//     if (site === "SYD") return sydNodes;
//     if (site === "志") return kokoNodes;
//     return allNodes;
//   }, [site, allNodes, sydNodes, kokoNodes]);

//   // Paginate nodes for performance optimization
//   const paginatedNodes = useMemo(() => filteredNodes.slice(0, page * PAGE_SIZE), [filteredNodes, page]);

//   // IntersectionObserver for infinite scrolling
//   const lastNodeRef = useCallback(
//     (node) => {
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && paginatedNodes.length < filteredNodes.length) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [paginatedNodes, filteredNodes]
//   );

//   if (!allNodes) {
//     return <Loading />;
//   }

//   if (errorMessage) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", fontWeight: "bold", justifyContent: "center", gap: "10px", alignItems: "center", color: "#757676", margin: "auto", height: "80vh" }}>
//         <WifiOffIcon className="temperature-icon" width={300} height={300} />
//         <Typography variant="h4" fontWeight="bold">Offline</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div>
//       <Box>
//         {editClick ? (
//           <EditNode data={singleNode} handleEditInfo={handleEditInfo} />
//         ) : (
//           <Box>
//             {!selectedNode ? (
//               <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
//                 <Typography variant="h6" fontWeight="bold" textAlign="left" fontSize="28px" marginLeft="20px">
//                   合計 {site ? filteredNodes?.length : allNodes?.length} ノード
//                 </Typography>
//                 <Button variant="contained" sx={{ height: "70%", marginLeft: "auto", marginRight: "70px" }} onClick={handleClick}>
//                   フィルター
//                 </Button>
//                 <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//                   {["All", "SYD", "志"].map((label) => (
//                     <MenuItem key={label} onClick={() => setSite(label)}>{label}</MenuItem>
//                   ))}
//                 </Menu>
//               </Box>
//             ) : (
//               <Box></Box>
//             )}
//             <Box>
//               {selectedNode ? (
//                 <NodeInfo data={singleNode} handleIsClickedNode={handleIsClickedNode} handleEditInfo={handleEditInfo} />
//               ) : (
//                 <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%", animation: "fadeIn 3s", padding: "20px" }}>
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: "70px" }}>
//                     {paginatedNodes.map((data, index) => (
//                       <Box key={data?.node_mac} sx={{ maxWidth: "calc(33.333% - 16px)", minWidth: "325px" }} ref={index === paginatedNodes.length - 1 ? lastNodeRef : null}>
//                         <NodewayCard data={data} handleIsClickedNode={handleIsClickedNode} getSingleNode={getSingleNode} />
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </div>
//   );
// }

// export default React.memo(AllNodes);
