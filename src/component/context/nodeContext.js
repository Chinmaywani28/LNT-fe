// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getGatewayInfo } from "../Services/gatewayService";
// import { getNodeInfo } from "../Services/nodeService";

// const NodeDataContext = createContext();

// export const NodeDataProvider = ({ children }) => {
//   const [gatewayInfo, setGatewayInfo] = useState([]);
//   const [nodeInfo, setNodeInfo] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [sydNodes, setSydNodes] = useState(null);
//   const [kokoNodes, setKokoNodes] = useState(null);
//   const [sydGateway, setSydGateway] = useState(null);
//   const [kokoGateway, setKokoGateway] = useState(null);

//   const fetchGatewayInfo = async () => {
//     setLoading(true);
//     setError(null); // Reset error before fetching data
//     try {
//       const gateway = await getGatewayInfo();
//       setGatewayInfo(gateway);
//       setSydGateway(gateway?.filter((gateway) => gateway?.site === "SYD"));
//       setKokoGateway(gateway?.filter((gateway) => gateway?.site === "志"));
//     } catch (err) {
//       console.log(err, "error");
//       setError("Failed to fetch gateway information. Please try again.");
//       console.error("Error fetching gateway information:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchNodeInfo = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const node = await getNodeInfo();
//       setNodeInfo(node);
//       setSydNodes(node?.filter((node) => node?.site === "SYD"));
//       setKokoNodes(node?.filter((node) => node?.site === "志"));
//     } catch (err) {
//       setError("Failed to fetch node information. Please try again.");
//       // console.error("Error fetching node information:", err);
//       console.log(err, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <NodeDataProvider.Provider
//       value={{ gatewayInfo, nodeInfo, sydNodes, kokoNodes,sydGateway,kokoGateway,error,loading }}
//     >
//       {children}
//     </NodeDataProvider.Provider>
//   );
// };

// export const useNodeData = () => useContext(NodeDataContext);

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getGatewayInfo } from "../Services/gatewayService";
// import { getNodeInfo } from "../Services/nodeService";

// const NodeDataContext = createContext();

// export const NodeDataProvider = ({ children }) => {
//   const [gatewayInfo, setGatewayInfo] = useState([]);
//   const [nodeInfo, setNodeInfo] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [sydNodes, setSydNodes] = useState([]);
//   const [kokoNodes, setKokoNodes] = useState([]);
//   const [sydGateway, setSydGateway] = useState([]);
//   const [kokoGateway, setKokoGateway] = useState([]);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [gateway, node] = await Promise.all([
//         getGatewayInfo(),
//         getNodeInfo(),
//       ]);

//       setGatewayInfo(gateway);
//       setNodeInfo(node);

//       setSydGateway(gateway?.filter((g) => g?.site === "SYD"));
//       setKokoGateway(gateway?.filter((g) => g?.site === "志"));

//       setSydNodes(node?.filter((n) => n?.site === "SYD"));
//       setKokoNodes(node?.filter((n) => n?.site === "志"));
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <NodeDataContext.Provider
//       value={{
//         gatewayInfo,
//         nodeInfo,
//         sydNodes,
//         kokoNodes,
//         sydGateway,
//         kokoGateway,
//         error,
//         loading,
//       }}
//     >
//       {children}
//     </NodeDataContext.Provider>
//   );
// };

// export const useNodeData = () => useContext(NodeDataContext);

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getGatewayInfo } from "../Services/gatewayService";
import { getNodeInfo } from "../Services/nodeService";

const NodeDataContext = createContext();

export const NodeDataProvider = ({ children }) => {
  const [gatewayInfo, setGatewayInfo] = useState([]);
  const [nodeInfo, setNodeInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Data Function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [gateway, node] = await Promise.all([getGatewayInfo(), getNodeInfo()]);

      setGatewayInfo((prev) => (JSON.stringify(prev) === JSON.stringify(gateway) ? prev : gateway));
      setNodeInfo((prev) => (JSON.stringify(prev) === JSON.stringify(node) ? prev : node));
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Use useMemo to filter data dynamically
  const sydNodes = useMemo(() => nodeInfo.filter((n) => n.site === "TC-4"), [nodeInfo]);
  const kokoNodes = useMemo(() => nodeInfo.filter((n) => n.site === "TC-5"), [nodeInfo]);

  const sydGateway = useMemo(() => gatewayInfo.filter((g) => g.site === "TC-4"), [gatewayInfo]);
  const kokoGateway = useMemo(() => gatewayInfo.filter((g) => g.site === "TC-5"), [gatewayInfo]);

  return (
    <NodeDataContext.Provider
      value={{
        gatewayInfo,
        nodeInfo,
        sydNodes,
        kokoNodes,
        sydGateway,
        kokoGateway,
        error,
        loading,
      }}
    >
      {children}
    </NodeDataContext.Provider>
  );
};

export const useNodeData = () => useContext(NodeDataContext);
