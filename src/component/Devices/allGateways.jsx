import {
  Box,
  Button,
  Typography,
  Snackbar,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import GatewayCard from "../gateway/gatewayCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NodewayCard from "../node/nodeCard";
import Detailgateway from "../gateway/Detailgateway";
import NodeInfo from "../node/NodeInfo";
import Loading from "../Loading/loading";
import EditNode from "../node/EditNode";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";

function AllGateways({
  allGateways,
  fetchNodesConnectedTOGateway,
  fetchSingleNode,
  fetchSingleGateway,
  handleFilterGateway,
  errorMessage,
  sydGateway,kokoGateway
}) {
 // const [filterGateway, setFilterGateway] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [IndividualGateway, setIndividualGateway] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [singleNode, setSingleNode] = useState("");
  const [isClickedNode, setIsClickedNode] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const [status, setStatus] = useState(1);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [site, setSite] = useState(null);
  // const [sydGateway, setSydGateway] = useState(null);
  // const [kokoGateway, setKokoGateway] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const getIndividualNodeConnected = (key) => {
    try {
      const connectedNodes = fetchNodesConnectedTOGateway(key);
      setNodes(connectedNodes || []);
    } catch (err) {
      console.error("Error fetching connected nodes:", err);
      setError("Failed to fetch connected nodes");
      setOpenSnackbar(true);
    }
  };

  const handleIsClicked = (clicked) => {
    setIsClicked(clicked);
  };

  const handleIsClickedNode = (nodeClick) => {
    setIsClickedNode(nodeClick);
  };

  const getSingleNode = (key) => {
    try {
      const node = fetchSingleNode(key);
      setSingleNode(node || {});
    } catch (err) {
      console.error("Error fetching single node:", err);
      setError("Failed to fetch single node");
      setOpenSnackbar(true);
    }
  };

  const getIndividualGatewayConn = (gateway_name) => {
    try {
      const gateway = fetchSingleGateway(gateway_name);
      setIndividualGateway(gateway || {});
    } catch (err) {
      console.error("Error fetching gateway info:", err);
      setError("Failed to fetch gateway information");
      setOpenSnackbar(true);
    }
  };

  const handleEditInfo = (click) => {
    setEditClick(click);
  };

  const handleFilterStatus = () => {
    setStatus(status === 0 ? 1 : 0);
  };

  const filterGatewayBySite = (site) => {
    setSite(site);  // This triggers re-render and useEffect
    handleClose();  // Close the dropdown or modal
  };

     const filterGateway = useMemo(() => {
        if (!site || site === "All") return allGateways;
        return site === 'TC-4' ? sydGateway : kokoGateway;
      }, [site, allGateways, sydGateway, kokoGateway]);

  if (!allGateways) {
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
          <EditNode handleEditInfo={handleEditInfo} />
        ) : (
          <Box>
            {!isClicked ? (
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

                  Total{" "}
                  {site ? filterGateway?.length : allGateways?.length}{" "}
                  Gateway
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
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => filterGatewayBySite('All')} value='All'>All</MenuItem>
                  <MenuItem onClick={() => filterGatewayBySite('TC-4')} value='TC-4'>TC-4</MenuItem>
                  <MenuItem onClick={() => filterGatewayBySite('TC-5')} value='TC-5'>TC-5</MenuItem>
                </Menu>
              </Box>
            ) : !isClickedNode ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    margin: "auto",
                    marginTop: "0px",
                    marginLeft: "0px",
                    width: "75%",
                  }}
                >
                  <Button
                    sx={{
                      color: "#464AA6",
                      marginLeft: "-18px",
                      height: "0px",
                      width: "20%",
                      marginTop: "65px",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 1,
                        backgroundColor: "transparent",
                      },
                    }}
                    color="inherit"
                    variant="inherit"
                    size="small"
                    onClick={() => setIsClicked(false)}
                  >
                    <ArrowBackIcon
                      sx={{ marginRight: "20px", fontSize: "25px" }}
                    />
                    <Typography fontWeight="bold">All gateways</Typography>
                  </Button>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="left"
                    fontSize="28px"
                    marginLeft="20px"
                    marginTop="25px"
                  >
                    Total {nodes?.length} Node
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "25px 35px",
                      padding: "20px",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    {nodes?.map((data) => (
                      <NodewayCard
                        key={data.id}
                        data={data}
                        getSingleNode={getSingleNode}
                        handleIsClickedNode={handleIsClickedNode}
                        onButtonClick={getIndividualGatewayConn}
                      />
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "30%",
                    marginTop: "40px",
                    marginRight: "20px",
                    height: "100%",
                  }}
                >
                  <Detailgateway
                    data={IndividualGateway}
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ animation: "fadeIn 3s" }}>
                <NodeInfo
                  data={singleNode}
                  handleIsClickedNode={handleIsClickedNode}
                  handleEditInfo={handleEditInfo}
                />
              </Box>
            )}
            {allGateways?.length === 0 ? (
              <Loading />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "70px",
                  columnGap: "70px",
                  padding: "20px",
                  width: "100%",
                  animation: "fadeIn 3s",
                }}
              >
                {isClicked ? (
                  <Box></Box>
                ) : site ? (
                  filterGateway?.map((data,index) => (
                    <GatewayCard
                      key={`gateway-${index}`}
                      data={data}
                      getIndividualGatewayConn={getIndividualGatewayConn}
                      getIndividualNodeConnected={getIndividualNodeConnected}
                      handleIsClicked={handleIsClicked}
                    />
                  ))
                ) : (
                  allGateways?.map((data,index) => (
                    <GatewayCard
                      key={`gateway-${index}`}
                      data={data}
                      getIndividualGatewayConn={getIndividualGatewayConn}
                      getIndividualNodeConnected={getIndividualNodeConnected}
                      handleIsClicked={handleIsClicked}
                    />
                  ))
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
      {error && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
        >
          <Box sx={{ padding: 2, backgroundColor: "red", color: "white" }}>
            {error}
          </Box>
        </Snackbar>
      )}
    </div>
  );
}

export default AllGateways;
