import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

const GaugeChart = ({ value, tempCheck, gadget, unit, range }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const memoizedTempCheck = useMemo(() => tempCheck, [tempCheck]);

    useEffect(() => {
        if (!chartRef.current) return;

        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        const option = {
            tooltip: {
                formatter: `{a} <br/>{b} : {c}${unit}`,
            },
            series: [
                {
                    name: gadget,
                    type: 'gauge',
                    min: 0,
                    max: unit === '%' ? 100 : range ? range : 100 ,
                    progress: {
                        show: true,
                        width: 10,
                        itemStyle: {
                            color: memoizedTempCheck.colors,
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [[1, memoizedTempCheck.bgColor]],
                        },
                    },
                    pointer: {
                        length: '70%',
                        width: 5,
                        itemStyle: {
                            color: memoizedTempCheck.colors,
                        },
                    },
                    detail: {
                        show: true,
                        formatter: `{value}${unit}`,
                        fontSize: 14,
                        color: memoizedTempCheck.colors,
                    },
                    data: [{ value }],
                },
            ],
        };
        chartInstance.current.setOption(option);

    }, [value, memoizedTempCheck, gadget, unit, range]);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default React.memo(GaugeChart);
