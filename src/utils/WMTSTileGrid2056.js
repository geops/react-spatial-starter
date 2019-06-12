import WMTSTilegrid from 'ol/tilegrid/WMTS';
import PROJ from './EPSG2056';

export const origin = [2420000, 1350000];

export const tileGridResolutions = [
  4000,
  3750,
  3500,
  3250,
  3000,
  2750,
  2500,
  2250,
  2000,
  1750,
  1500,
  1250,
  1000,
  750,
  650,
  500,
  250,
  100,
  50,
  20,
  10,
  5,
  2.5,
  2,
  1.5,
  1,
  0.5,
  0.25,
];

export const matrixIds = tileGridResolutions.map((res, i) => `${i}`);

export const { extent } = PROJ;

export default new WMTSTilegrid({
  origin,
  extent,
  resolutions: tileGridResolutions,
  matrixIds,
});
