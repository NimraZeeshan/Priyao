import { LOGIN_SUCCESSFUL } from "../actions/authAction";

const initialState = {
  authorize: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL: {
      // console.log({
      //   ...state,
      // });
      return {
        ...state,
        authorize: true,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
