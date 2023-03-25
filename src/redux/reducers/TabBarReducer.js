import { ROUTE, TABINDEX } from "../actions";
const initialState = {
  route: "",
  index: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTE: {
      return {
        ...state,
        route: action.payload.route,
      };
    }
    case TABINDEX: {
      return {
        ...state,
        index: action.payload.num,
      };
    }
    default: {
      return state;
    }
  }
};
