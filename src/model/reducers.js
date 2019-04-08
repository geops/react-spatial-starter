import {
  SET_LAYERS,
  SET_CENTER,
  SET_RESOLUTION,
  SET_ZOOM,
  ADD_LAYERS,
} from './actions';

const initialState = {
  layers: [],
  zoom: 9,
  center: [922747.8054581558, 5911639.7675754195],
};

export default function schulzugApp(state = initialState, action) {
  switch (action.type) {
    case SET_LAYERS:
      return {
        ...state,
        layers: [...action.data],
      };
    case ADD_LAYERS:
      return {
        ...state,
        layers: [
          ...state.layers.filter(l =>
            action.data.find(layer => l.getName() !== layer.getName()),
          ),
          ...action.data,
        ],
      };
    case SET_CENTER:
      return {
        ...state,
        center: [...action.data],
      };
    case SET_RESOLUTION:
      return {
        ...state,
        resolution: action.data,
      };
    case SET_ZOOM:
      return {
        ...state,
        zoom: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
