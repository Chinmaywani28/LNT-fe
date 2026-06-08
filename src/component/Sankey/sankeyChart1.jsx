import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getMainMeterdatabybuilding } from "../Services/graph.service";
import { getDgmonthlyProduce } from "../Services/graph.service";
import { useEnergy } from "../context/energyMainmetercontext"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart } from "react-chartjs-2";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import { ReactComponent as EnergyIcon } from "../config/svgfiles/zap.svg";

ChartJS.register(
    SankeyController,
    Flow,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const SankeyChart = () => {
    const [difference, setdifference] = useState(0);
    const [error, setError] = useState(false);
    const [errormessage, setErrorMessage] = useState(null);
    const [Monthlydata_Gen, setMonthlydata_Gen] = useState({
        dg: 0,
        meter: 51.375,
        solar: 8.88,
    });
    const [Monthlydata_Consume, setMonthlydata_Consume] = useState({
        op1: 21.77,
        op2: 20.05,
        admin: 18.44,
        sez: 0,
    });
    const [IsLoading, setLoading] = useState(true);

    const { Monthlydata_Generation } = useEnergy();

    const processdata = () => {
        const { solar, meter } = Monthlydata_Generation;
        setMonthlydata_Gen({ solar, meter });
        return solar + meter;
    };

    const processdataconsume = (data) => {
        console.log(data,"processdataconsume")
        const processedData = {
            op1: Math.floor(data.op1),
            op2: Math.floor(data.op2),
            admin: Math.floor(data.admin),
        };
        setMonthlydata_Consume(processedData);
        return Object.values(processedData).reduce((sum, value) => sum + value, 0);
    };

    const fetchdata = async () => {
        try {
            const data = await getMainMeterdatabybuilding();
            const totalconsumption = processdataconsume(data.processdatacomsume[0]);
            const totalgen = processdata();
            const dgdata = await getDgmonthlyProduce();
            const diff = totalgen - totalconsumption;

            if (diff > 0) {
                setdifference(diff / 3);
            }            

            setMonthlydata_Gen((prevState) => ({
                ...prevState,
                dg: dgdata[0].dg,
            }));
        } catch (error) {
            setError(true);
            //   const errorMessages = {
            //     500: errorMessageIndividual.error_500,
            //     404: errorMessageIndividual.error_404,
            //     'Network Error': errorMessageIndividual.networkError,
            //     400: errorMessageIndividual.error_400,
            //   };
            //   setErrorMessage(errorMessages[error.message.split(' ').pop()] || 'An unexpected error occurred');
            console.error(error);
        }
    };


    useEffect(() => {
        setLoading(true);
        // fetchdata();
        setLoading(false);
    }, [Monthlydata_Generation]);

    const data = {
        labels: [
            `Diesel Generator ${Math.floor(Monthlydata_Gen.dg)}MWh`,
            `Electricity Grid ${Monthlydata_Gen.meter}MWh`,
            `Solar ${Monthlydata_Gen.solar}MWh`,
            `LNT ${parseFloat(
                (Monthlydata_Gen.solar + Monthlydata_Gen.meter).toFixed(2)
            )}MWh`,
            `TC-4 ${parseFloat(
                (Monthlydata_Consume.op1 + difference).toFixed(2)
            )}MWh`,
            `TC-4I ${parseFloat(
                (Monthlydata_Consume.op2 + difference).toFixed(2)
            )}MWh`,
            `Admin Building ${parseFloat(
                (Monthlydata_Consume.admin + difference).toFixed(2)
            )}MWh`,
        ],
        datasets: [
            {
                label: "Sankey",
                font: {
                    size: 16, // Adjust the size as needed
                    weight: 'bold', // Make the labels bold
                },
                data: [
                    {
                        from: `Diesel Generator ${Math.floor(Monthlydata_Gen.dg)}MWh`,
                        to: `LNT ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.meter).toFixed(2)
                        )}MWh`,
                        flow: Math.floor(Monthlydata_Gen.dg),
                    },
                    {
                        from: `Electricity Grid ${Monthlydata_Gen.meter}MWh`,
                        to: `LNT ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.meter).toFixed(2)
                        )}MWh`,
                        flow: Monthlydata_Gen.meter,
                    },
                    {
                        from: `Solar ${Monthlydata_Gen.solar}MWh`,
                        to: `LNT ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.meter).toFixed(2)
                        )}MWh`,
                        flow: Monthlydata_Gen.solar,
                    },
                    {
                        from: `LNT ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.meter).toFixed(2)
                        )}MWh`,
                        to: `TC-4 ${parseFloat(
                            (Monthlydata_Consume.op1 + difference).toFixed(2)
                        )}MWh`,
                        flow: parseFloat((Monthlydata_Consume.op1 + difference).toFixed(2)),
                    },
                    {
                        from: `LNT ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.meter).toFixed(2)
                        )}MWh`,
                        to: `TC-5 ${parseFloat(
                            (Monthlydata_Consume.op2 + difference).toFixed(2)
                        )}MWh`,
                        flow: parseFloat((Monthlydata_Consume.op2 + difference).toFixed(2)),
                    },
                    {
                        from: `LNT ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.meter).toFixed(2)
                        )}MWh`,
                        to: `TC-6 ${parseFloat(
                            (Monthlydata_Consume.admin + difference).toFixed(2)
                        )}MWh`,
                        flow: parseFloat(
                            (Monthlydata_Consume.admin + difference).toFixed(2)
                        ),
                    },
                ],
                colorFrom: "#7EC6F2",
                colorTo: "#79F2AE",
                colorMode: "gradient",
            },
        ],
    };

    console.log(data,'data');

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const getColorSettings = (data) => {
        if (data?.dg !== null && data?.meter !== null && data?.solar !== null) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        }
        else {
            return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
        }
    };

    const tempCheck = getColorSettings(Monthlydata_Gen);

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', color: tempCheck.colors, }}>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', gap: 2, }}>
                    <EnergyIcon className="temperature-icon" width={32} height={32} />
                    <Typography variant='h6' fontWeight='bold'>
                        Monthly Energy Distribution
                    </Typography>
                </Box>
            </Box>
            {!(Monthlydata_Gen?.dg !== null && Monthlydata_Gen?.meter !== null && Monthlydata_Gen?.solar !== null) ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: 3, marginBottom: '25px' }}>
                <WifiOffIcon className="temperature-icon" width={72} height={72} />
            </Box> : <Box sx={{ marginTop : 3}}>
                <Chart type="sankey" data={data} options={options} width="1500" height="800" />
            </Box>}
        </Box>
    );
};

export default SankeyChart;
