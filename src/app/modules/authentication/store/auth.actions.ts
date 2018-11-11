import { Action } from '@ngrx/store';

// define the actions names
export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    GOOGLE_LOGIN = '[Auth] Google login attempt',
    FACEBOOK_LOGIN = '[Auth] Facebook login attempt',
    LOGOUT = '[Auth] Logout',
    GET_AUTHENTICATED_USER = '[Auth] Get authenticated user',
    AUTHENTICATED = '[Auth] Authenticated',
    NOT_AUTHENTICATED = '[Auth] Not Authenticated',
    AUTH_ERROR = '[Auth] Error',
    REGISTER = '[Auth] Register'
}

// define the actions

// Get User AuthState
export class ActionGetAuthenticatedUser implements Action {
    readonly type = AuthActionTypes.GET_AUTHENTICATED_USER;
    constructor(public payload?: any) { }
}

export class ActionAuthenticated implements Action {
    readonly type = AuthActionTypes.AUTHENTICATED;
    constructor(public payload?: any) { }
}

export class ActionNotAuthenticated implements Action {
    readonly type = AuthActionTypes.NOT_AUTHENTICATED;
    constructor(public payload?: any) { }
}

export class ActionAuthError implements Action {
    readonly type = AuthActionTypes.AUTH_ERROR;
    constructor(public payload?: any) { }
}

export class ActionRegister implements Action {
    readonly type = AuthActionTypes.REGISTER;
    constructor(public payload?: any) { }
}

// Login Actions
export class ActionLogin implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload?: any) { }
}

export class ActionGoogleLogin implements Action {
    readonly type = AuthActionTypes.GOOGLE_LOGIN;
    constructor(public payload?: any) { }
}

export class ActionFacebookLogin implements Action {
    readonly type = AuthActionTypes.FACEBOOK_LOGIN;
    constructor(public payload?: any) { }
}

// Logout Actions
export class ActionLogout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
    constructor(public payload?: any) { }
}

// export auth actions
export type AuthActions
    = ActionGetAuthenticatedUser
    | ActionAuthenticated
    | ActionNotAuthenticated
    | ActionLogin
    | ActionGoogleLogin
    | ActionFacebookLogin
    | ActionAuthError
    | ActionLogout;
