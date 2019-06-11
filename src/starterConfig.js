import { resolutions, extent } from './utils/WMTSTileGrid3857';
import CONF from './config';

export default {
  layers: [
    {
      name: 'Basemap',
      visible: true,
      isBaseLayer: true,
      data: {
        type: 'wmts',
        url:
          `${CONF.tilesUrl}/wmts/netzkarte_relief_grey_webmercator/` +
          'webmercator/{TileMatrix}/{TileCol}/{TileRow}.png',
        matrixSet: 'webmercator',
        requestEncoding: 'REST',
        projectionExtent: extent,
        resolutions,
      },
    },
  ],
};
