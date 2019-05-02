export const CREATE_SESSION = "CREATE_SESSION";
export const DESTROY_SESSION = "DESTROY_SESSION";
export const GET_SESSION = "GET_SESSION";

const initialState = {
  user: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_SESSION:
      return { ...state, user: action.payload };
      case CREATE_SESSION:
      return { ...state, user: action.payload };
    case DESTROY_SESSION:
      return { state: initialState };
    default:
      return state;
  }
}

export function getSession(user) {
    return {
        type: GET_SESSION,
        payload: user
    }
}

export function createSession(user) {
    return {
        type: CREATE_SESSION,
        payload: user
    }
}

export function destroySession() {
  return {
    type: DESTROY_SESSION,
    payload: null
  }
}
