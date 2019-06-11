import PROJ_2056 from './utils/EPSG2056';
import PROJ_3857 from './utils/EPSG3857';
import CONF from './config';

const wmtsTileGrids = {
  epsg2056: {
    origin: [2420000, 1350000],
    resolutions: [
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
    ],
    extent: PROJ_2056.extent,
  },
  epsg3857: {
    resolutions: [
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
    ],
    extent: PROJ_3857.extent,
  },
};

const layers = [
  {
    name: 'Basemap',
    visible: true,
    isBaseLayer: true,
    data: {
      type: 'wmts',
      url:
        `${CONF.tilesUrl}/wmts/netzkarte_relief_grey_webmercator/` +
        'webmercator/{TileMatrix}/{TileCol}/{TileRow}.png',
      requestEncoding: 'REST',
      projectionExtent: wmtsTileGrids.epsg3857.extent,
      resolutions: wmtsTileGrids.epsg3857.resolutions,
    },
  },
];

export default {
  wmtsTileGrids,
  layers,
};
