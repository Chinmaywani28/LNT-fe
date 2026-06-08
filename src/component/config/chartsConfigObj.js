import MediumCard from "../card/GeneralisedCards/mediumCard";
import SmallCard from "../card/GeneralisedCards/smallCard";
import SmallPressureMeter from "../card/GeneralisedCards/smallPressureMeter";
import ValveMediumCard from "../card/GeneralisedCards/valveMediumCard";

export const chartsObj = [
  {
    chartId: "basicEnergy",
    chartName: "Basic Energy Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["energy"],
    renderImg: () => (
      <img
        src="basicEnergy.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateEnergy",
    chartName: "Intermidiate Energy Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["energy"],
    renderImg: () => (
      <img
        src="intermEnergy.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicPower",
    chartName: "Basic Power Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["power"],
    renderImg: () => (
      <img
        src="basicPower.png"
        alt="Power Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiatePower",
    chartName: "Intermidiate Power Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["power"],
    renderImg: () => (
      <img
        src="intermidiatePower.png"
        alt="Power Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicTemp",
    chartName: "Basic Temp Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["temperature"],
    renderImg: () => (
      <img
        src="temperature.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateTemp",
    chartName: "Intermidiate Temp Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["temperature"],
    renderImg: () => (
      <img
        src="intermTemp.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicHumidity",
    chartName: "Basic Humidity Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["humidity"],
    renderImg: (props) => (
      <img
        src="humidity.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateHumidity",
    chartName: "Intermidiate Humidity Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["humidity"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicPressure",
    chartName: "Basic Pressure Chart",
    render: (props) => <SmallPressureMeter {...props} />,
    type: ["pressure"],
    renderImg: (props) => (
      <img
        src="press.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiatePressure",
    chartName: "Intermidiate Pressure Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["pressure"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicPressureMeter",
    chartName: "Basic Pressure Meter",
    render: (props) => <SmallPressureMeter {...props} />,
    type: ["pressure"],
    renderImg: (props) => (
      <img
        src="press.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicCO",
    chartName: "Basic CO Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["co"],
    renderImg: (props) => (
      <img
        src="press.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateCO",
    chartName: "Intermidiate CO Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["co"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicCO2",
    chartName: "Basic CO2 Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["co2"],
    renderImg: (props) => (
      <img
        src="press.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateCO2",
    chartName: "Intermidiate CO2 Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["co2"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicLux",
    chartName: "Basic LUX Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["lux"],
    renderImg: (props) => (
      <img
        src="press.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateLux",
    chartName: "Intermidiate LUX Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["lux"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicNoise",
    chartName: "Basic Noise Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["noise"],
    renderImg: (props) => (
      <img
        src="press.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateNoise",
    chartName: "Intermidiate Noise Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["noise"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicVibration",
    chartName: "Basic Vibration Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["vibration"],
    renderImg: (props) => (
      <img
        src="press.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateVibration",
    chartName: "Intermidiate Vibration Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["vibration"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicValve",
    chartName: "Basic Valve Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["valve"],
    renderImg: (props) => (
      <img
        src="valve.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateValve",
    chartName: "Intermidiate Valve Chart",
    render: (props) => <ValveMediumCard {...props} />,
    type: ["valve"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicCheck",
    chartName: "Basic Check Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["check"],
    renderImg: (props) => (
      <img
        src="check.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateCheck",
    chartName: "Intermidiate Check Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["check"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicParticle",
    chartName: "Basic Particle Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["particle"],
    renderImg: (props) => (
      <img
        src="check.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateParticle",
    chartName: "Intermidiate Particle Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["particle"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicCurrent",
    chartName: "Basic Current Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["current"],
    renderImg: (props) => (
      <img
        src="check.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateCurrent",
    chartName: "Intermidiate Current Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["current"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicFlow",
    chartName: "Basic Flow Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["flow"],
    renderImg: (props) => (
      <img
        src="check.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateFlow",
    chartName: "Intermidiate Flow Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["flow"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicSensor",
    chartName: "Basic Sensor Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["sensor"],
    renderImg: (props) => (
      <img
        src="sensor.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicAlarm",
    chartName: "Basic Alarm Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["alarm"],
    renderImg: (props) => (
      <img
        src="alarm.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicHeat",
    chartName: "Basic Heat Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["heat"],
    renderImg: (props) => (
      <img
        src="check.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateHeat",
    chartName: "Intermidiate Heat Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["heat"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicDiscomfort",
    chartName: "Basic Discomfort Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["discomfort"],
    renderImg: (props) => (
      <img
        src="basicDiscomfort.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateDiscomfort",
    chartName: "Intermidiate Discomfort Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["discomfort"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
   {
    chartId: "basicNO2",
    chartName: "Basic NO2 Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["no2"],
    renderImg: (props) => (
      <img
        src="basicNO2.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateNO2",
    chartName: "Intermidiate NO2 Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["no2"],
    renderImg: () => (
      <img
        src="mediumNO2.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "basicGas",
    chartName: "Basic Gas Chart",
    render: (props) => <SmallCard {...props} />,
    type: ["gas"],
    renderImg: (props) => (
      <img
        src="basicDiscomfort.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
  {
    chartId: "intermidiateGas",
    chartName: "Intermidiate Gas Chart",
    render: (props) => <MediumCard {...props} />,
    type: ["gas"],
    renderImg: () => (
      <img
        src="intermHumid.png"
        alt="Temperature Icon"
        style={{ width: "auto", height: "auto" }}
      />
    ),
  },
];
