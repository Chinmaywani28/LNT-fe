import React, { useEffect, useState } from "react";
import {
    getdataEnergyDynamicindi, get10FfloorCombineEnergySankeySYD, get11FfloorCombineEnergySankeySYD, get12FfloorCombineEnergySankeySYD, get13FfloorCombineEnergySankeySYD,
    get14FfloorCombineEnergySankeySYD, get15FfloorCombineEnergySankeySYD, get1FfloorCombineEnergySankeySYD, get3FfloorCombineEnergySankeySYD, get4FfloorCombineEnergySankeySYD,
    get5FfloorCombineEnergySankeySYD, get6FfloorCombineEnergySankeySYD, get7FfloorCombineEnergySankeySYD, get8FfloorCombineEnergySankeySYD, get9FfloorCombineEnergySankeySYD,
    getB1FfloorCombineEnergySankeySYD, getGFfloorCombineEnergySankeySYD, getPowerGridCombineEnergySankeySYD, getSolarPowerCombineEnergySankey,
    get1FfloorCombineEnergySankey
} from "../Services/graph.service";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { config } from './sankeyConfigSYD'
import ReactECharts from "echarts-for-react";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import { Box, Typography } from "@mui/material";

const SankeyChartSYD = () => {
    const [Monthlydata_Gen, setMonthlydata_Gen] = useState({
        powergrid: 0,
        solar: null,
        ups: null,
        dg: 0,
    });
    const [Monthlydata_Consume, setMonthlydata_Consume] = useState({
        F1: 0,
        F3: 0,
        F4: 0,
        F5: 0,
        F6: 0,
        F7: 0,
        F8: 0,
        F9: 0,
        F10: 0,
        F11: 0,
        F12: 0,
        F13: 0,
        F14: 0,
        F15: 0,
        FB1: 0,
        FG: 0,
        EV: 0,
        FH: 0,
    });
    const [floor1, setFloor1] = useState(null);
    const [floor2, setFloor2] = useState(null);
    const [floor3, setFloor3] = useState(null);
    const [floor4, setFloor4] = useState(null);
    const [floor5, setFloor5] = useState(null);
    const [floor6, setFloor6] = useState(null);
    const [floor7, setFloor7] = useState(null);
    const [floor8, setFloor8] = useState(null);
    const [floor9, setFloor9] = useState(null);
    const [floor10, setFloor10] = useState(null);
    const [floor11, setFloor11] = useState(null);
    const [floor12, setFloor12] = useState(null);
    const [floor13, setFloor13] = useState(null);
    const [floor14, setFloor14] = useState(null);
    const [floor15, setFloor15] = useState(null);
    const [floorB1, setFloorB1] = useState(null);
    const [floorG, setFloorG] = useState(null);

    const fetchData = async () => {
        try {
            const [
                FirstFloor,
                ThirdFloor,
                FourthFloor,
                FifthFloor,
                SixthFloor,
                SeventhFloor,
                EighthFloor,
                NinthFloor,
                TenthFloor,
                EleventhFloor,
                TwelfthFloor,
                ThirteenthFloor,
                FourteenthFloor,
                FifteenthFloor,
                BasementFloor,
                GroundFloor,
            ] = await Promise.all([
                get1FfloorCombineEnergySankeySYD(),
                get3FfloorCombineEnergySankeySYD(),
                get4FfloorCombineEnergySankeySYD(),
                get5FfloorCombineEnergySankeySYD(),
                get6FfloorCombineEnergySankeySYD(),
                get7FfloorCombineEnergySankeySYD(),
                get8FfloorCombineEnergySankeySYD(),
                get9FfloorCombineEnergySankeySYD(),
                get10FfloorCombineEnergySankeySYD(),
                get11FfloorCombineEnergySankeySYD(),
                get12FfloorCombineEnergySankeySYD(),
                get13FfloorCombineEnergySankeySYD(),
                get14FfloorCombineEnergySankeySYD(),
                get15FfloorCombineEnergySankeySYD(),
                getB1FfloorCombineEnergySankeySYD(),
                getGFfloorCombineEnergySankeySYD(),
            ]);

            const floors = [
                ThirdFloor, FourthFloor, FifthFloor, SixthFloor,
                SeventhFloor, EighthFloor, NinthFloor, TenthFloor, EleventhFloor,
                TwelfthFloor, ThirteenthFloor, FourteenthFloor, FifteenthFloor,
                BasementFloor, GroundFloor
            ];

            const totalConsumption = floors.reduce((sum, floor) => sum + floor, 0);

            setMonthlydata_Gen({
                powergrid: totalConsumption / 1000,
            });

            setMonthlydata_Consume({
                F1: FirstFloor,
                F3: ThirdFloor,
                F4: FourthFloor,
                F5: FifthFloor,
                F6: SixthFloor,
                F7: SeventhFloor,
                F8: EighthFloor,
                F9: NinthFloor,
                F10: TenthFloor,
                F11: EleventhFloor,
                F12: TwelfthFloor,
                F13: ThirteenthFloor,
                F14: FourteenthFloor,
                F15: FifteenthFloor,
                FB1: BasementFloor,
                FG: GroundFloor,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFloorData = async (floorKey, setFloor) => {
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
        } catch (error) {
            console.error(error);
        }
    };

    const generateSankeyData = () => {
        const nodes = new Set();
        const nodeValues = new Map();
        const links = [];

        const floorOrder = ["15F", "14F", "13F", "12F", "11F", "10F", "9F", "8F", "7F", "6F", "5F", "4F", "3F", "GF", "B1F"];

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

        addLink("Power Grid", "SYD", parseFloat(Monthlydata_Gen.powergrid || 0).toFixed(2));

        const floors = {
            "3F": Monthlydata_Consume.F3, "4F": Monthlydata_Consume.F4, "5F": Monthlydata_Consume.F5,
            "6F": Monthlydata_Consume.F6, "7F": Monthlydata_Consume.F7, "8F": Monthlydata_Consume.F8, "9F": Monthlydata_Consume.F9,
            "10F": Monthlydata_Consume.F10, "11F": Monthlydata_Consume.F11, "12F": Monthlydata_Consume.F12, "13F": Monthlydata_Consume.F13,
            "14F": Monthlydata_Consume.F14, "15F": Monthlydata_Consume.F15, "B1F": Monthlydata_Consume.FB1, "GF": Monthlydata_Consume.FG + Monthlydata_Consume.F1
        };

        floorOrder.forEach(floor => {
            const data = floors[floor];
            if (data !== undefined && data !== null) {
                addLink("SYD", floor, (parseFloat(data) / 1000).toFixed(2));
            }
        });

        const processFloor = (floor, data) => {
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(({ name, value }) => {
                    if (name && value !== undefined && value !== null) {
                        addLink(floor, name, (parseFloat(value) / 1000).toFixed(2));
                    }
                });
            }
        };

        const floorDataMap = {
            "1F": floor1, "3F": floor3, "4F": floor4, "5F": floor5, "6F": floor6, "7F": floor7,
            "8F": floor8, "9F": floor9, "10F": floor10, "11F": floor11, "12F": floor12,
            "13F": floor13, "14F": floor14, "15F": floor15, "B1F": floorB1, "GF": floorG
        };

        floorOrder.forEach(floor => processFloor(floor, floorDataMap[floor]));

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
            nodes: [...nodes]
                .map(name => ({ name, value: parseFloat(nodeValues.get(name)).toFixed(2) }))
                .sort((a, b) => {
                    const indexA = floorOrder.indexOf(a.name);
                    const indexB = floorOrder.indexOf(b.name);
                    if (indexA !== -1 && indexB !== -1) {
                        return indexA - indexB;
                    }
                    return 0;
                }),
            links,
        };
    };

    useEffect(() => {
        fetchData();
        fetchFloorData("1F", setFloor1);
        fetchFloorData("3F", setFloor3);
        fetchFloorData("4F", setFloor4);
        fetchFloorData("5F", setFloor5);
        fetchFloorData("6F", setFloor6);
        fetchFloorData("7F", setFloor7);
        fetchFloorData("8F", setFloor8);
        fetchFloorData("9F", setFloor9);
        fetchFloorData("10F", setFloor10);
        fetchFloorData("11F", setFloor11);
        fetchFloorData("12F", setFloor12);
        fetchFloorData("13F", setFloor13);
        fetchFloorData("14F", setFloor14);
        fetchFloorData("15F", setFloor15);
        fetchFloorData("B1F", setFloorB1);
        fetchFloorData("GF", setFloorG);
    }, []);

    const sankeyData = generateSankeyData();

    const option = {
        title: {
            text: "SYDエネルギー配賦",
            left: "center",
        },
        tooltip: {
            trigger: "item",
            formatter: ({ data }) => {
                if (data.source) {
                    return `${data?.source} → ${data?.target}: ${data?.value} kWh`;
                } else {
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
                nodeAlign: 'left',
                data: sankeyData?.nodes,
                links: sankeyData?.links,
                lineStyle: {
                    color: "gradient",
                    curveness: 0.5,
                    width: 2
                },
                label: {
                    fontSize: 14,
                    fontWeight: "bold",
                },
                layoutIterations: 0,
            },
        ],
    };

    const getColorSettings = (data) => {
        if (data?.dg !== null && data?.meter !== null && data?.solar !== null) {
            return {
                bgColor: "#E9EEEF",
                borderColor: "#E9EEEF",
                colors: "#006DBC",
                fontColor: "#878A8B",
            };
        } else {
            return {
                bgColor: "#E5EBEB",
                borderColor: "#E5EBEB",
                colors: "#757676",
                fontColor: "#757676",
            };
        }
    };

    const tempCheck = getColorSettings(Monthlydata_Gen);
    return (
        (sankeyData.nodes?.length && sankeyData.links?.length) ? <ReactECharts option={option} style={{ height: "1200px", width: "100%" }} /> : <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: 3, marginBottom: '25px' }}>
            <Typography variant='h6' fontWeight='bold' sx={{ display: 'inline-block', verticalAlign: 'top', position: 'relative', top: -35 }}>LNT TC-4 Energy Distribution</Typography>
            <WifiOffIcon className="temperature-icon" width={72} height={72} />
        </Box>
    );
};

export default SankeyChartSYD;
