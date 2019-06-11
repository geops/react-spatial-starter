import WMTSTilegrid from 'ol/tilegrid/WMTS';
import PROJ from './EPSG3857';

export const resolutions = [
  156543.033928,
  78271.516964,
  39135.758482,
  19567.879241,
  9783.9396205,
  4891.96981025,
  2445.98490513,
  1222.99245256,
  611.496226281,
  305.748113141,
  152.87405657,
  76.4370282852,
  38.2185141426,
  19.1092570713,
  9.55462853565,
  4.77731426782,
  2.38865713391,
  1.19432856696,
  0.597164283478,
  0.298582141739,
];

export const matrixIds = resolutions.map((res, i) => `${i}`);

export const { extent } = PROJ;

export default new WMTSTilegrid({
  extent,
  resolutions,
  matrixIds,
});
