import { useReducer } from 'react';
import axios from 'axios';

interface UserInterface {
  id: string;
  name: string;
  email: string;
}

interface UserStateInterface {
  error: boolean;
  user: UserInterface | null;
}

const initialState: UserStateInterface = {
  error: false,
  user: null,
};

const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: {
    user: UserInterface;
  };
}

interface FetchUserErrorAction {
  type: typeof FETCH_USER_ERROR;
  payload: {
    error: boolean;
  };
}

type UserReducerActionTypes = FetchUserSuccessAction | FetchUserErrorAction;

function userReducer(
  state: UserStateInterface,
  action: UserReducerActionTypes,
) {
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      return {
        error: false,
        user: action.payload.user,
      };
    }
    case FETCH_USER_ERROR: {
      return {
        error: action.payload.error,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}

type FetchUserHookType = UserStateInterface & {
  fetchUser: () => void;
};

export interface FetchUserParams {
  id: number | string;
}

export const useFetchUserHook = (
  params: FetchUserParams,
): FetchUserHookType => {
  const [{ user, error }, dispatch] = useReducer(userReducer, initialState);

  const fetchUser = async () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then((response) => {
        const { data } = response;
        dispatch({ type: FETCH_USER_SUCCESS, payload: { user: data } });
      })
      .catch((fetchError) => {
        dispatch({ type: FETCH_USER_ERROR, payload: { error: fetchError } });
      });
  };

  return {
    user,
    error,
    fetchUser,
  };
};
