import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import {
    get1FfloorCombineEnergySankey,
    get2FfloorCombineEnergySankey,
    get3FfloorCombineEnergySankey,
    getdataEnergyDynamicindi,
    getEVStationCombineEnergySankey,
    getFireHydrantCombineEnergySankey,
    getSolarPowerCombineEnergySankey,
    getUPSCombineEnergySankey,
} from "../Services/graph.service";
import { config } from "./sankeyConfig";
import { useEnergyData } from "../context/sankeyEnergyDataContext";

const SankeyChart = ({  Monthlydata_Gen, Monthlydata_Consume, floor1, floor2, floor3 }) => {
    // const [Monthlydata_Gen, setMonthlydata_Gen] = useState({
    //     powergrid: 0,
    //     solar: null,
    //     ups: null,
    //     dg: 0,
    // });
    // const [Monthlydata_Consume, setMonthlydata_Consume] = useState({
    //     F1: 0,
    //     F2: 0,
    //     F3: 0,
    //     EV: 0,
    //     FH: 0,
    // });
    // const [floor1, setFloor1] = useState([]);
    // const [floor2, setFloor2] = useState([]);
    // const [floor3, setFloor3] = useState([]);
    // const { Monthlydata_Gen, Monthlydata_Consume, floor1, floor2, floor3 } = useEnergyData();

    // useEffect(() => {
    //     fetchData();
    //     fetchFloorData("1F", setFloor1);
    //     fetchFloorData("2F", setFloor2);
    //     fetchFloorData("3F", setFloor3);
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const [
    //             Solar,
    //             FirstFloor,
    //             SecondFloor,
    //             ThirdFloor,
    //             UPS,
    //             FireHydrant,
    //             EVStation,
    //         ] = await Promise.all([
    //             getSolarPowerCombineEnergySankey(),
    //             get1FfloorCombineEnergySankey(),
    //             get2FfloorCombineEnergySankey(),
    //             get3FfloorCombineEnergySankey(),
    //             getUPSCombineEnergySankey(),
    //             getFireHydrantCombineEnergySankey(),
    //             getEVStationCombineEnergySankey(),
    //         ]);

    //         const totalConsumption = FirstFloor + SecondFloor + ThirdFloor;
    //         const totalGeneration = Solar + UPS;
    //         const PowerGrid = totalConsumption - totalGeneration;

    //         setMonthlydata_Gen({
    //             powergrid: PowerGrid,
    //             dg: 0,
    //             solar: Solar,
    //             ups: UPS,
    //         });

    //         setMonthlydata_Consume({
    //             F1: FirstFloor,
    //             F2: SecondFloor,
    //             F3: ThirdFloor,
    //             EV: FireHydrant,
    //             FH: EVStation,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const fetchFloorData = async (floorKey, setFloor) => {
    //     try {
    //         const floorConfig = config[floorKey] || [];
    //         const floorData = await Promise.allSettled(
    //             floorConfig.map(async (f) => {
    //                 try {
    //                     const data = await getdataEnergyDynamicindi("combine", f);
    //                     return { name: f.meter_name, value: data?.meter_reading?.toFixed(2) };
    //                 } catch (error) {
    //                     console.error(`Error processing ${f}:`, error);
    //                     return null;
    //                 }
    //             })
    //         );

    //         const formattedData = floorData
    //             .filter(entry => entry.status === "fulfilled" && entry.value !== null)
    //             .map(entry => entry.value);

    //         setFloor(formattedData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const generateSankeyData = () => {
        const nodes = new Set();
        const links = [];
        const nodeValues = new Map(); 

        const addNode = (name) => {
            nodes.add(name);
            if (!nodeValues.has(name)) nodeValues.set(name, 0); 
        };

        const addLink = (from, to, value) => {
            const formattedValue = parseFloat(value) || 0;
            if (formattedValue > 0) {
                addNode(from);
                addNode(to);
                links.push({ source: from, target: to, value: formattedValue });
                nodeValues.set(from, (nodeValues.get(from) || 0) + formattedValue);
                if (!nodeValues.has(to)) {
                    nodeValues.set(to, 0);
                }
            }
        };

        // Generation Sources
        addLink("Diesel Generator", "志", Monthlydata_Gen?.dg?.toFixed(2));
        addLink("Power Grid", "志", Monthlydata_Gen?.powergrid?.toFixed(2));
        addLink("Solar", "志", Monthlydata_Gen?.solar?.toFixed(2));
        addLink("UPS", "志", Monthlydata_Gen?.ups?.toFixed(2));

        // Consumption Breakdown
        addLink("志", "3F", Monthlydata_Consume?.F3?.toFixed(2));
        addLink("志", "2F", Monthlydata_Consume?.F2?.toFixed(2));
        addLink("志", "1F", Monthlydata_Consume?.F1?.toFixed(2));
        addLink("志", "EV Station", Monthlydata_Consume?.EV?.toFixed(2));
        addLink("志", "Fire Hydrant", Monthlydata_Consume?.FH?.toFixed(2));

        // Add subBranches for each floor
        const processFloor = (floor, data) => {
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(({ name, value }) => {
                    if (name && value !== undefined && value !== null) {
                        addLink(floor, name, (parseFloat(value)).toFixed(2));
                    }
                });
            }
        };

        processFloor("3F", floor3);
        processFloor("2F", floor2);
        processFloor("1F", floor1);

        const targetNodes = new Set(links.map(link => link.target));
        targetNodes.forEach(target => {
            if (!nodeValues.has(target) || nodeValues.get(target) === 0) {
                const incomingValue = links
                    .filter(link => link.target === target)
                    .reduce((sum, link) => sum + link.value, 0);
                nodeValues.set(target, incomingValue);
            }
        });

        return {
            nodes: [...nodes].map(name => ({ name, value: parseFloat(nodeValues.get(name)).toFixed(2) })), // Use nodeValues for tooltips
            links,
        };
    };

    // const generateSankeyData = () => {
    //     const nodes = new Set();
    //     const links = [];
    //     const nodeValues = new Map();
    
    //     const addNode = (name) => {
    //         nodes.add(name);
    //         if (!nodeValues.has(name)) nodeValues.set(name, 0);
    //     };
    
    //     const addLink = (from, to, value) => {
    //         const formattedValue = parseFloat(value) || 0;
    //         if (formattedValue > 0) {
    //             addNode(from);
    //             addNode(to);
    //             links.push({ source: from, target: to, value: formattedValue });
    //             nodeValues.set(from, (nodeValues.get(from) || 0) + formattedValue);
    //             if (!nodeValues.has(to)) {
    //                 nodeValues.set(to, 0);
    //             }
    //         }
    //     };
    
    //     // Generation Sources
    //     addLink("Diesel Generator", "志", parseFloat(Monthlydata_Gen?.dg).toFixed(2));
    //     addLink("Power Grid", "志", parseFloat(Monthlydata_Gen?.powergrid).toFixed(2));
    //     addLink("Solar", "志", parseFloat(Monthlydata_Gen?.solar).toFixed(2));
    //     addLink("UPS", "志", parseFloat(Monthlydata_Gen?.ups).toFixed(2));
    
    //     // Consumption Breakdown
    //     addLink("志", "EV Station", parseFloat(Monthlydata_Consume?.EV).toFixed(2));
    //     addLink("志", "Fire Hydrant", parseFloat(Monthlydata_Consume?.FH).toFixed(2));
    //     addLink("志", "3F", parseFloat(Monthlydata_Consume?.F3).toFixed(2));
    //     addLink("志", "2F", parseFloat(Monthlydata_Consume?.F2).toFixed(2));
    //     addLink("志", "1F", parseFloat(Monthlydata_Consume?.F1).toFixed(2));
    
    //     // Add subBranches for each floor
    //     const processFloor = (floor, data) => {
    //         if (Array.isArray(data) && data.length > 0) {
    //             data.forEach(({ name, value }) => {
    //                 if (name && value !== undefined && value !== null) {
    //                     addLink(floor, name, parseFloat(value).toFixed(2));
    //                 }
    //             });
    //         }
    //     };
    
    //     processFloor("1F", floor1);
    //     processFloor("2F", floor2);
    //     processFloor("3F", floor3);
    
    //     // Ensure target nodes have correct values
    //     const targetNodes = new Set(links.map(link => link.target));
    //     targetNodes.forEach(target => {
    //         if (!nodeValues.has(target) || nodeValues.get(target) === 0) {
    //             const incomingValue = links
    //                 .filter(link => link.target === target)
    //                 .reduce((sum, link) => sum + link.value, 0);
    //             nodeValues.set(target, incomingValue);
    //         }
    //     });
    
    //     // Define target sorting priority (higher index = higher priority)
    //     const floorOrder = ["3F", "2F", "1F", "EV Station", "Fire Hydrant"];
    
    //     // **Sort links: First by target priority, then by value descending**
    //     links.sort((a, b) => {
    //         const indexA = floorOrder.indexOf(a.target);
    //         const indexB = floorOrder.indexOf(b.target);
    
    //         // Ensure targets not in predefined order are pushed to the end
    //         if (indexA === -1 && indexB === -1) return 0;
    //         if (indexA === -1) return 1;
    //         if (indexB === -1) return -1;
    
    //         // First, sort by target priority (higher index first)
    //         if (indexA !== indexB) {
    //             return indexB - indexA; // **Descending order**
    //         }
    
    //         // If targets are the same, sort by value descending
    //         return parseFloat(b.value) - parseFloat(a.value);
    //     });
    
    //     console.log("Sorted Links:", links); // Debugging Output
    
    //     return {
    //         nodes: [...nodes].map(name => ({
    //             name,
    //             value: parseFloat(nodeValues.get(name)).toFixed(2)
    //         })), // Use nodeValues for tooltips
    //         links,
    //     };
    // };
     
    const sankeyData = generateSankeyData();
   
    const option = {
        title: {
            text: "志 エネルギー分配",
            left: "center",
        },
        tooltip: {
            trigger: "item",
            formatter: ({ data }) => {
                if (data.source) {
                    // Display source → target flow information for links
                    return `${data?.source} → ${data?.target}: ${data?.value} kWh`;
                } else {
                    // Display individual node information
                    return `${data?.name}: ${data?.value ? data?.value : "No data"} kWh`;
                }
            },
        },        
        series: [
            {
                type: "sankey",
                layout: "none",
                emphasis: {
                    focus: "adjacency",
                },
                data: sankeyData.nodes,
                links: sankeyData.links,
                lineStyle: {
                    color: "gradient",
                    curveness: 0.5,
                    width : 2
                },
                label: {
                    fontSize: 14,
                    fontWeight: "bold",
                },
                layoutIterations: 0, 
            },
        ],
    };

    return <ReactECharts option={option} style={{ height: "1200px", width: "100%" }} />;
};

export default SankeyChart;

// import React, { useEffect, useState } from "react";
// import ReactECharts from "echarts-for-react";
// import {
//     get1FfloorCombineEnergySankey,
//     get2FfloorCombineEnergySankey,
//     get3FfloorCombineEnergySankey,
//     getdataEnergyDynamicindi,
//     getEVStationCombineEnergySankey,
//     getFireHydrantCombineEnergySankey,
//     getSolarPowerCombineEnergySankey,
//     getUPSCombineEnergySankey,
// } from "../Services/graph.service";
// import { config } from "./sankeyConfig";

// const SankeyChart = () => {
//     const [expandedNodes, setExpandedNodes] = useState(new Set()); // Tracks expanded parent nodes
//     const [sankeyData, setSankeyData] = useState({ nodes: [], links: [] });
    
//     const [Monthlydata_Gen, setMonthlydata_Gen] = useState({
//         powergrid: 0,
//         solar: null,
//         ups: null,
//         dg: 0,
//     });
//     const [Monthlydata_Consume, setMonthlydata_Consume] = useState({
//         F1: 0,
//         F2: 0,
//         F3: 0,
//         EV: 0,
//         FH: 0,
//     });

//     const [floorData, setFloorData] = useState({
//         "1F": [],
//         "2F": [],
//         "3F": []
//     });

//     useEffect(() => {
//         fetchData();
//         fetchFloorData("1F");
//         fetchFloorData("2F");
//         fetchFloorData("3F");
//     }, []);

//     const fetchData = async () => {
//         try {
//             const [Solar, FirstFloor, SecondFloor, ThirdFloor, UPS, FireHydrant, EVStation] = await Promise.all([
//                 getSolarPowerCombineEnergySankey(),
//                 get1FfloorCombineEnergySankey(),
//                 get2FfloorCombineEnergySankey(),
//                 get3FfloorCombineEnergySankey(),
//                 getUPSCombineEnergySankey(),
//                 getFireHydrantCombineEnergySankey(),
//                 getEVStationCombineEnergySankey(),
//             ]);

//             const totalConsumption = FirstFloor + SecondFloor + ThirdFloor;
//             const totalGeneration = Solar + UPS;
//             const PowerGrid = totalConsumption - totalGeneration;

//             setMonthlydata_Gen({
//                 powergrid: PowerGrid,
//                 dg: 0,
//                 solar: Solar,
//                 ups: UPS,
//             });

//             setMonthlydata_Consume({
//                 F1: FirstFloor,
//                 F2: SecondFloor,
//                 F3: ThirdFloor,
//                 EV: FireHydrant,
//                 FH: EVStation,
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchFloorData = async (floorKey) => {
//         try {
//             const floorConfig = config[floorKey] || [];
//             const floorData = await Promise.allSettled(
//                 floorConfig.map(async (f) => {
//                     try {
//                         const data = await getdataEnergyDynamicindi("combine", f);
//                         return { name: f.meter_name, value: data?.meter_reading?.toFixed(2) };
//                     } catch (error) {
//                         console.error(`Error processing ${f}:`, error);
//                         return null;
//                     }
//                 })
//             );

//             const formattedData = floorData
//                 .filter(entry => entry.status === "fulfilled" && entry.value !== null)
//                 .map(entry => entry.value);

//             setFloorData(prev => ({ ...prev, [floorKey]: formattedData }));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const toggleExpandNode = (nodeName) => {
//         setExpandedNodes(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(nodeName)) {
//                 newSet.delete(nodeName);
//             } else {
//                 newSet.add(nodeName);
//             }
//             return newSet;
//         });
//     };

//     const generateSankeyData = () => {
//         const nodes = new Set();
//         const links = [];
//         const nodeValues = new Map(); 

//         const addNode = (name) => {
//             nodes.add(name);
//             if (!nodeValues.has(name)) nodeValues.set(name, 0); 
//         };

//         const addLink = (from, to, value) => {
//             if (parseFloat(value) > 0) {
//                 addNode(from);
//                 addNode(to);
//                 links.push({ source: from, target: to, value: parseFloat(value) });
//             }
//         };

//         // Energy Sources
//         addLink("Diesel Generator", "Main", Monthlydata_Gen.dg?.toFixed(2));
//         addLink("Power Grid", "Main", Monthlydata_Gen.powergrid?.toFixed(2));
//         addLink("Solar", "Main", Monthlydata_Gen.solar?.toFixed(2));
//         addLink("UPS", "Main", Monthlydata_Gen.ups?.toFixed(2));

//         // Floor Consumption
//         addLink("Main", "1F", Monthlydata_Consume.F1?.toFixed(2));
//         addLink("Main", "2F", Monthlydata_Consume.F2?.toFixed(2));
//         addLink("Main", "3F", Monthlydata_Consume.F3?.toFixed(2));
//         addLink("Main", "EV Station", Monthlydata_Consume.EV?.toFixed(2));
//         addLink("Main", "Fire Hydrant", Monthlydata_Consume.FH?.toFixed(2));

//         // Expandable child nodes
//         ["1F", "2F", "3F"].forEach(floor => {
//             if (expandedNodes.has(floor)) {
//                 floorData[floor]?.forEach(({ name, value }) => {
//                     addLink(floor, name, parseFloat(value).toFixed(2));
//                 });
//             }
//         });

//         const targetNodes = new Set(links.map(link => link.target));
//         targetNodes.forEach(target => {
//             if (!nodeValues.has(target) || nodeValues.get(target) === 0) {
//                 const incomingValue = links
//                     .filter(link => link.target === target)
//                     .reduce((sum, link) => sum + link.value, 0);

//                 nodeValues.set(target, incomingValue);
//             }
//         });

//         return {
//             nodes: [...nodes].map(name => ({ name, value: parseFloat(nodeValues.get(name)).toFixed(2) })), // Use nodeValues for tooltips
//             links,
//         };
//     };

//     useEffect(() => {
//         setSankeyData(generateSankeyData());
//     }, [expandedNodes]);

//     const option = {
//         title: {
//             text: "Energy Distribution",
//             left: "center",
//         },
//         tooltip: {
//             trigger: "item",
//             formatter: ({ data }) => data.source
//                 ? `${data.source} → ${data.target}: ${data.value} kWh`
//                 : `${data.name}: ${data.value || "No data"} kWh`,
//         },
//         series: [
//             {
//                 type: "sankey",
//                 layout: "none",
//                 emphasis: { focus: "adjacency" },
//                 data: sankeyData.nodes,
//                 links: sankeyData.links,
//                 lineStyle: { color: "gradient", curveness: 0.5,  },
//                 label: {
//                     fontSize: 14,
//                     fontWeight: "bold",
//                     formatter: ({ data }) =>
//                         ["1F", "2F", "3F"].includes(data.name)
//                             ? `{a|${data.name}} {b|[+]}`
//                             : data.name,
//                     rich: {
//                         a: { fontWeight: "bold" },
//                         b: { color: "#007bff", fontSize: 14 },
//                     },
//                 },
//             },
//         ],
//     };

//     return (
//         <ReactECharts
//             option={option}
//             style={{ height: "1200px", width: "100%" }}
//             onEvents={{
//                 click: (params) => {
//                     if (["1F", "2F", "3F"].includes(params.data.name)) {
//                         toggleExpandNode(params.data.name);
//                     }
//                 },
//             }}
//         />
//     );
// };

// export default SankeyChart;


