// angular
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, from, defer, Subject } from 'rxjs';
import { map, switchMap, catchError, takeUntil } from 'rxjs/operators';
// ngrx
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthState, initialState, AUTH_KEY } from './auth.reducer';
import { AuthenticatedUser } from './auth-user.model';
import {
    ActionGetAuthenticatedUser,
    AuthActionTypes,
    ActionAuthenticated,
    ActionNotAuthenticated,
    ActionAuthError,
    ActionRegister,
    ActionLogin,
    ActionGoogleLogin,
    ActionFacebookLogin,
    ActionLogout
} from './auth.actions';
// app
import { AuthenticationService } from './auth.service';
// firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {
    private unsubscribe$: Subject<void> = new Subject<void>();

    @Effect() getUser$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.GET_AUTHENTICATED_USER),
        map((action: ActionGetAuthenticatedUser) => action.payload),
        switchMap(payload => {
            return this.afAuth.authState.pipe(
                map(authData => {
                    if (authData) {
                        // create logged in user instance and call the authenticated action
                        const user = new AuthenticatedUser(authData.uid, authData.displayName,
                            authData.photoURL, authData.email, '');
                        return new ActionAuthenticated(user);
                    } else {
                        // User not logged in, call not authenticated action
                        return new ActionNotAuthenticated();
                    }
                }),
                catchError(err => of(new ActionAuthError()))
            );
        }),
    );

    // Register with email and password
    @Effect() register$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.REGISTER),
        map((action: ActionRegister) => action.payload),
        switchMap(payload => {
            return from(this.register(payload)).pipe(
                map(credential => {
                    // successful login, return the authenticated user
                    return new ActionGetAuthenticatedUser();
                }),
                catchError(err => {
                    return of(new ActionAuthError({ error: err.message }));
                })
            );
        }),
    );

    // login effects
    @Effect() login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: ActionLogin) => action.payload),
        switchMap(payload => {
            return from(this.login(payload)).pipe(
                map(credential => {
                    // successful login, return current user
                    return new ActionGetAuthenticatedUser();
                }),
                catchError(err => {
                    return of(new ActionAuthError({ error: err.message }));
                })
            );
        }),
    );

    // Login with Google OAuth
    @Effect() loginWithGoogle$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.GOOGLE_LOGIN),
        map((action: ActionGoogleLogin) => action.payload),
        switchMap(payload => {
            return from(this.googleLogin()).pipe(
                map(credential => {
                    // successful login
                    return new ActionGetAuthenticatedUser();
                }),
                catchError(err => {
                    return of(new ActionAuthError({ error: err.message }));
                })
            );
        }),
    );

    // Login with facebook
    @Effect() loginWithFacebook$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.FACEBOOK_LOGIN),
        map((action: ActionFacebookLogin) => action.payload),
        switchMap(payload => {
            return from(this.facebookLogin()).pipe(
                map(credential => {
                    // successful login
                    return new ActionGetAuthenticatedUser();
                }),
                catchError(err => {
                    return of(new ActionAuthError({ error: err.message }));
                })
            );
        }),
    );

    // logout effect
    @Effect() logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        map((action: ActionLogout) => action.payload),
        switchMap(payload => {
            // logout from firebase (case firebase auth)
            this.afAuth.auth.signOut();
            // return initial state promise
            return of(initialState).toPromise();
            // return of( this.afAuth.auth.signOut(); );
        }),
        map(authData => {
            return new ActionNotAuthenticated();
        }),
        catchError(err => of(new ActionAuthError({ error: err.message })))
    );

    // initialize the store on app load.
    // do not move this. let this effect last as it does not trigger if you put it in first position.
    @Effect({ dispatch: false })
    init$: Observable<any> = defer(() => {
        console.log('INIT EFFECT');
        this.store.dispatch(new ActionGetAuthenticatedUser());
    });

    constructor(
        private actions$: Actions<Action>,
        private store: Store<AuthState>,
        private afAuth: AngularFireAuth,
        private authenticationService: AuthenticationService
    ) {
    }

    // Internal Methods
    private googleLogin(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        const obj = this.afAuth.auth.signInWithPopup(provider);
        return obj;
    }
    private facebookLogin(): Promise<any> {
        const provider = new firebase.auth.FacebookAuthProvider();
        const obj = this.afAuth.auth.signInWithPopup(provider);
        return obj;
    }
    private register(model: any): Promise<any> {
        return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(model.email, model.password).then(
            user => this.updateProfile(model)
        );
    }

    private updateProfile(model: any): Promise<any> {
        return this.afAuth.auth.currentUser.updateProfile({
            displayName: `${model.firstName} ${model.lastName}`,
            photoURL: ''
        });
    }

    private login(model: any): Promise<any> {
        const obj = this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(model.email, model.password);
        return obj;
    }
}
