
import { Box } from '@mui/material'
import MediumWhetherCard from '../card/Whether/mediumWhetherCard'
import MediumAirCard from '../card/Air/mediumAirCard'
import SankeyChartSYD from '../Sankey/sankeyChartSYD'
import SankeyChart from '../Sankey/sankeyChart1'
import SmallCard from '../card/GeneralisedCards/smallCard'
import { gas, gasM, no2, no2M } from '../config/cardsConfigData'
import MediumCard from '../card/GeneralisedCards/mediumCard'

const HomePage = () => {
    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };
    return (
        <div>
            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <MediumWhetherCard
                    City={'chennai'}
                />
                <MediumAirCard Data={{ meter_name: 'Air Quality Index', location: 'LNT Chennai', }}
                    lat={13.022851} lon={80.178165}
                />
            </Box>
            {/* <Box sx={{ paddingY: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ ...styles.thinBorder, padding: 5, display: 'flex', justifyContent: 'center', bgcolor: '#E9EEEF', alignItems: 'center', flexWrap: 'wrap', width: '98%', borderRadius: '20px', height: '100%', margin: 'auto' }}>
                    <SankeyChartSYD />
                    <SankeyChart />
                </Box>
            </Box> */}
            {/* <Box>
                <SmallCard Data={no2} />
                <MediumCard Data={no2M} />
                <MediumCard Data={gasM} />
                <SmallCard Data={gas} />
            </Box> */}
        </div>
    )
}

export default HomePage
