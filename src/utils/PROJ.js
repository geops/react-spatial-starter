import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import EPSG2056 from './EPSG2056';
import EPSG21781 from './EPSG21781';
import EPSG3857 from './EPSG3857';

register(proj4);

export { EPSG2056, EPSG21781, EPSG3857 };
export default EPSG3857;
