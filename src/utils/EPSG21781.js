import proj4 from 'proj4';

proj4.defs(
  'EPSG:21781',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs',
);

export default {
  epsgCode: 'EPSG:21781',
  extent: [420000, 30000, 900000, 350000],
  center: [660000, 190000],
  zoom: 9,
};
