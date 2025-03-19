type RawLightState = {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: Array<number>;
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
};

export type RawSWUpdate = {
  state: string;
  lastinstall: string;
};

export type RawLightCt = {
  min: number;
  max: number;
};

export type RawLightControl = {
  mindimlevel: number;
  maxlumen: number;
  colorgamuttype: string;
  colorgamut: Array<Array<number>>;
  ct: RawLightCt;
};

export type RawLightStreaming = {
  renderer: boolean;
  proxy: boolean;
};

export type RawLightConfig = {
  archetype: string;
  function: string;
  direction: string;
  startup: {
    mode: string;
    configured: boolean;
  };
};

export type RawLightCapabilities = {
  certified: boolean;
  control: RawLightControl;
  streaming: RawLightStreaming;
};

export type RawLight = {
  state: RawLightState;
  swupdate?: RawSWUpdate;
  type: string;
  name: string;
  modelid?: string;
  manufacturername?: string;
  productname?: string;
  capabilities: RawLightCapabilities;
  config: RawLightConfig;
  uniqueid: string;
  swversion?: string;
  swconfigid?: string;
  productid?: string;
};

export type Light = {
  id: string;
  isOn: boolean;
  reachable?: boolean;
  bright: number;
  brightPercentage: number;
  colorful: boolean;
  color?: any;
  colorIsDark: boolean;
  hue?: number;
  sat?: number;
  name: string;
  type: string;
  notALight: boolean;
};

type RawGroupState = {
  all_on: boolean;
  any_on: boolean;
};

export type RawGroupAction = {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: Array<number>;
  ct: number;
  alert: string;
  colormode: string;
};

export type RawGroup = {
  name: string;
  lights?: Array<string>;
  sensors?: Array<string>;
  type: string;
  state: RawGroupState;
  recycle?: false;
  class?: string;
  action: RawGroupAction;
};

export type Room = {
  id: string;
  name: string;
  type: string;
  lights: Array<string>;
  allOn: boolean;
  anyOn: boolean;
  colorful?: boolean;
  color?: any;
  colorIsDark: boolean;
  on: boolean;
  hue?: number;
  saturation: number;
  bright: number;
  brightPercentage: number;
  notALight: boolean;
};

export type StorageResult = {
  data?: any;
  error?: string;
};

export type SetLightBrightnessProps = {
  id: string;
  percentage: number;
};

export type SuccessObject = {
  [key: string]: boolean;
};
