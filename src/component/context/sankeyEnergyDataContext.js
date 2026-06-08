// import React, { createContext, useContext, useEffect, useState } from "react";
// import db from "../config/db"; // Import IndexedDB instance
// import { config } from "../Sankey/sankeyConfig";
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

// const EnergyDataContext = createContext();

// export const EnergyDataProvider = ({ children }) => {
//     const [Monthlydata_Gen, setMonthlydata_Gen] = useState({});
//     const [Monthlydata_Consume, setMonthlydata_Consume] = useState({});
//     const [floor1, setFloor1] = useState([]);
//     const [floor2, setFloor2] = useState([]);
//     const [floor3, setFloor3] = useState([]);

//     useEffect(() => {
//         loadDataFromDB();
//     }, []);

//     const loadDataFromDB = async () => {
//         try {
//             const storedGen = await db.energyData.get("Monthlydata_Gen");
//             const storedConsume = await db.energyData.get("Monthlydata_Consume");
//             const storedFloor1 = await db.energyData.get("floor1");
//             const storedFloor2 = await db.energyData.get("floor2");
//             const storedFloor3 = await db.energyData.get("floor3");

//             if (storedGen && storedConsume && storedFloor1 && storedFloor2 && storedFloor3) {
//                 setMonthlydata_Gen(storedGen.value);
//                 setMonthlydata_Consume(storedConsume.value);
//                 setFloor1(storedFloor1.value);
//                 setFloor2(storedFloor2.value);
//                 setFloor3(storedFloor3.value);
//             } else {
//                 fetchData();
//             }
//         } catch (error) {
//             console.error("Error loading data from IndexedDB:", error);
//             fetchData(); // Fallback to API if IndexedDB fails
//         }
//     };

//     const fetchData = async () => {
//         try {
//             const [
//                 Solar,
//                 FirstFloor,
//                 SecondFloor,
//                 ThirdFloor,
//                 UPS,
//                 FireHydrant,
//                 EVStation,
//             ] = await Promise.all([
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

//             const newGenData = {
//                 powergrid: PowerGrid,
//                 dg: 0,
//                 solar: Solar,
//                 ups: UPS,
//             };

//             const newConsumeData = {
//                 F1: FirstFloor,
//                 F2: SecondFloor,
//                 F3: ThirdFloor,
//                 EV: FireHydrant,
//                 FH: EVStation,
//             };

//             setMonthlydata_Gen(newGenData);
//             setMonthlydata_Consume(newConsumeData);

//             await db.energyData.put({ key: "Monthlydata_Gen", value: newGenData });
//             await db.energyData.put({ key: "Monthlydata_Consume", value: newConsumeData });

//             fetchFloorData("1F", setFloor1, "floor1");
//             fetchFloorData("2F", setFloor2, "floor2");
//             fetchFloorData("3F", setFloor3, "floor3");
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const fetchFloorData = async (floorKey, setFloor, dbKey) => {
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

//             setFloor(formattedData);
//             await db.energyData.put({ key: dbKey, value: formattedData });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <EnergyDataContext.Provider value={{ Monthlydata_Gen, Monthlydata_Consume, floor1, floor2, floor3 }}>
//             {children}
//         </EnergyDataContext.Provider>
//     );
// };

// export const useEnergyData = () => useContext(EnergyDataContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import db, { encryptData, decryptData } from "../config/db";
import { config } from "../Sankey/sankeyConfig";
import { 
    getSolarPowerCombineEnergySankey, get1FfloorCombineEnergySankey,
    get2FfloorCombineEnergySankey, get3FfloorCombineEnergySankey, 
    getUPSCombineEnergySankey, getFireHydrantCombineEnergySankey, 
    getEVStationCombineEnergySankey, getdataEnergyDynamicindi 
} from "../Services/graph.service";

const EnergyDataContext = createContext();

export const EnergyDataProvider = ({ children }) => {
    const [Monthlydata_Gen, setMonthlydata_Gen] = useState({});
    const [Monthlydata_Consume, setMonthlydata_Consume] = useState({});
    const [floor1, setFloor1] = useState([]);
    const [floor2, setFloor2] = useState([]);
    const [floor3, setFloor3] = useState([]);

    useEffect(() => {
        loadDataFromDB();
    }, []);

    const loadDataFromDB = async () => {
        try {
            const storedGen = await db.energyData.get("Monthlydata_Gen");
            const storedConsume = await db.energyData.get("Monthlydata_Consume");
            const storedFloor1 = await db.energyData.get("floor1");
            const storedFloor2 = await db.energyData.get("floor2");
            const storedFloor3 = await db.energyData.get("floor3");

            if (storedGen && storedConsume && storedFloor1 && storedFloor2 && storedFloor3) {
                setMonthlydata_Gen(decryptData(storedGen.value));
                setMonthlydata_Consume(decryptData(storedConsume.value));
                setFloor1(decryptData(storedFloor1.value));
                setFloor2(decryptData(storedFloor2.value));
                setFloor3(decryptData(storedFloor3.value));
            } else {
                fetchData();
            }
        } catch (error) {
            console.error("Error loading data from IndexedDB:", error);
            fetchData();
        }
    };

    const fetchData = async () => {
        try {
            const [
                Solar, FirstFloor, SecondFloor, ThirdFloor, 
                UPS, FireHydrant, EVStation
            ] = await Promise.all([
                getSolarPowerCombineEnergySankey(),
                get1FfloorCombineEnergySankey(),
                get2FfloorCombineEnergySankey(),
                get3FfloorCombineEnergySankey(),
                getUPSCombineEnergySankey(),
                getFireHydrantCombineEnergySankey(),
                getEVStationCombineEnergySankey(),
            ]);

            const totalConsumption = FirstFloor + SecondFloor + ThirdFloor;
            const totalGeneration = Solar + UPS;
            const PowerGrid = totalConsumption - totalGeneration;

            const newGenData = {
                powergrid: PowerGrid,
                dg: 0,
                solar: Solar,
                ups: UPS,
            };

            const newConsumeData = {
                F1: FirstFloor,
                F2: SecondFloor,
                F3: ThirdFloor,
                EV: FireHydrant,
                FH: EVStation,
            };

            setMonthlydata_Gen(newGenData);
            setMonthlydata_Consume(newConsumeData);

            await db.energyData.put({ key: "Monthlydata_Gen", value: encryptData(newGenData) });
            await db.energyData.put({ key: "Monthlydata_Consume", value: encryptData(newConsumeData) });

            fetchFloorData("1F", setFloor1, "floor1");
            fetchFloorData("2F", setFloor2, "floor2");
            fetchFloorData("3F", setFloor3, "floor3");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchFloorData = async (floorKey, setFloor, dbKey) => {
        try {
            const floorConfig = config[floorKey] || [];
            const floorData = await Promise.allSettled(
                floorConfig.map(async (f) => {
                    try {
                        const data = await getdataEnergyDynamicindi("combine", f);
                        return { name: f.meter_name, value: data?.meter_reading?.toFixed(2) };
                    } catch (error) {
                        console.error(`Error processing ${f}:`, error);
                        return null;
                    }
                })
            );

            const formattedData = floorData
                .filter(entry => entry.status === "fulfilled" && entry.value !== null)
                .map(entry => entry.value);

            setFloor(formattedData);
            await db.energyData.put({ key: dbKey, value: encryptData(formattedData) });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <EnergyDataContext.Provider value={{ Monthlydata_Gen, Monthlydata_Consume, floor1, floor2, floor3 }}>
            {children}
        </EnergyDataContext.Provider>
    );
};

export const useEnergyData = () => useContext(EnergyDataContext);
