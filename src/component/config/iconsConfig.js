import { ReactComponent as PowerIcon } from "../config/svgfiles/zap.svg";
import { ReactComponent as EnergyIcon } from "../config/svgfiles/zap.svg";
import { ReactComponent as TemperatureIcon } from "../config/svgfiles/loader.svg";
import { ReactComponent as HumidIcon } from "../config/svgfiles/droplet.svg";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { ReactComponent as AQIcon } from "../config/svgfiles/wind.svg";
import { ReactComponent as LightIcon } from "../config/svgfiles/sun.svg";
import { ReactComponent as PressureIcon } from "../config/svgfiles/clock.svg";
import { ReactComponent as VibrationIcon } from "../config/svgfiles/activity.svg";
import { ReactComponent as FlowIcon } from "../config/svgfiles/git-commit.svg";
import { ReactComponent as HeatIcon } from "../config/svgfiles/heat_6853957.svg";
import { ReactComponent as AlarmIcon } from "../config/svgfiles/bell (1).svg";
import { ReactComponent as SensorIcon } from "../config/svgfiles/microchip_18651353.svg";
import { ReactComponent as CurrentIcon } from "../config/svgfiles/bolt-auto_10742104.svg";
import { ReactComponent as ParticleIcon } from "../config/svgfiles/constellation_13727352.svg";
import { ReactComponent as CheckIcon } from "../config/svgfiles/leave_13087965.svg";
import { ReactComponent as NoiseIcon } from "../config/svgfiles/volume_3917508.svg";
import { ReactComponent as ValveIcon } from "../config/svgfiles/engine_11747032.svg";
import { ReactComponent as DiscomfortIcon } from "../config/svgfiles/comfort-svgrepo-com.svg";

export const iconsCon = [
  {
    gadget_name: "energy",
    gadget_name_jp: "エネルギー",
    render: (props) => <EnergyIcon {...props} />,
  },
  {
    gadget_name: "power",
    gadget_name_jp: "力",
    render: (props) => <PowerIcon {...props} />,
  },
  {
    gadget_name: "temperature",
    gadget_name_jp: "温度",
    render: (props) => <TemperatureIcon {...props} />,
  },
  {
    gadget_name: "humidity",
    gadget_name_jp: "湿度",
    render: (props) => <HumidIcon {...props} />,
  },
  {
    gadget_name: "noise",
    gadget_name_jp: "ノイズ",
    render: (props) => <NoiseIcon {...props} />,
  },
  {
    gadget_name: "co2",
    gadget_name_jp: "二酸化炭素",
    render: (props) => <AQIcon {...props} />,
  },
  {
    gadget_name: "co",
    gadget_name_jp: "一酸化炭素",
    render: (props) => <AQIcon {...props} />,
  },
  {
    gadget_name: "lux",
    gadget_name_jp: "照度",
    render: (props) => <LightIcon {...props} />,
  },
  {
    gadget_name: "pressure",
    gadget_name_jp: "圧力",
    render: (props) => <PressureIcon {...props} />,
  },
  {
    gadget_name: "vibration",
    gadget_name_jp: "振動",
    render: (props) => <VibrationIcon {...props} />,
  },
  {
    gadget_name: "flow",
    gadget_name_jp: "フロー",
    render: (props) => <FlowIcon {...props} />,
  },
  {
    gadget_name: "heat",
    gadget_name_jp: "熱",
    render: (props) => <HeatIcon {...props} />,
  },
  {
    gadget_name: "alarm",
    gadget_name_jp: "アラーム",
    render: (props) => <AlarmIcon {...props} />,
  },
  {
    gadget_name: "sensor",
    gadget_name_jp: "センサー",
    render: (props) => <SensorIcon {...props} />,
  },
  {
    gadget_name: "current",
    gadget_name_jp: "現在",
    render: (props) => <EnergyIcon {...props} />,
  },
  {
    gadget_name: "particle",
    gadget_name_jp: "現在",
    render: (props) => <ParticleIcon {...props} />,
  },
  {
    gadget_name: "check",
    gadget_name_jp: "現在",
    render: (props) => <CheckIcon {...props} />,
  },
  {
    gadget_name: "valve",
    gadget_name_jp: "現在",
    render: (props) => <ValveIcon {...props} />,
  },
  {
    gadget_name: "discomfort",
    gadget_name_jp: "不快感",
    render: (props) => <DiscomfortIcon {...props} />,
  },
  {
    gadget_name: "no2",
    gadget_name_jp: "二酸化炭素",
    render: (props) => <AQIcon {...props} />,
  },
  {
    gadget_name: "gas",
    gadget_name_jp: "二酸化炭素",
    render: (props) => <AQIcon {...props} />,
  },
];
