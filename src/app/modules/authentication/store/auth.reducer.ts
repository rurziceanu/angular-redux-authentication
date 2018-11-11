import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthenticatedUser } from './auth-user.model';


// key for authentification in ngrx store
export const AUTH_KEY = 'authenticatedUser';

const defaultUser = new AuthenticatedUser(null, 'GUEST', null, null, null);

export const initialState: AuthenticatedUser = defaultUser;

export namespace AuthenticatedUserQuery {
  export const getAuthenticatedUser = (state: AuthState) => state.authenticatedUser;
}

export interface AuthState {
  authenticatedUser: AuthenticatedUser;
}

export function authReducer(
  state: AuthenticatedUser = defaultUser,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, loading: true };

    case AuthActionTypes.GET_AUTHENTICATED_USER:
      return { ...state, loading: true };

    case AuthActionTypes.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };

    case AuthActionTypes.NOT_AUTHENTICATED:
      return { ...state, ...defaultUser, loading: false };

    case AuthActionTypes.GOOGLE_LOGIN:
      return { ...state, loading: true };

    case AuthActionTypes.FACEBOOK_LOGIN:
      return { ...state, loading: true };

    case AuthActionTypes.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };

    case AuthActionTypes.LOGOUT:
      return { ...state, loading: true };

    default:
      return state;
  }
}
