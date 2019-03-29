import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const styles = {};

styles.default = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgba(170, 170, 170, 0.8)',
    }),
    stroke: new Stroke({
      width: 3,
      color: 'rgba(112, 112, 112, 1)',
    }),
    radius: 7,
  }),
});

styles.select = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgba(33, 150, 243, 0.4)',
    }),
    stroke: new Stroke({
      width: 2,
      color: 'rgba(33, 150, 243, 1)',
    }),
    radius: 7,
  }),
});

export default {
  get(styleId, isFeatureSelected) {
    let styleIds = [styleId];
    if (Array.isArray(styleId)) {
      styleIds = styleId;
    }
    return f => {
      const arr = styleIds.map(id => styles[id]);
      if (isFeatureSelected && isFeatureSelected(f)) {
        arr.push(styles.select);
      }
      return arr;
    };
  },
};
