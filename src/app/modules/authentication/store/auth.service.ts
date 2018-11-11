// angular
import { Injectable } from '@angular/core';
// rxjs
import { Observable } from 'rxjs';
// ngrx store
import { Store, select } from '@ngrx/store';
import { AuthenticatedUser } from './auth-user.model';
import { AuthenticatedUserQuery, AuthState } from './auth.reducer';
import * as userActions from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Observable Queries available for consumption by views
  user$ = this.store.pipe(select(AuthenticatedUserQuery.getAuthenticatedUser));

  constructor(
    private store: Store<AuthState>,
  ) { }
  login(model: any): Observable<AuthenticatedUser> {
    this.store.dispatch(new userActions.ActionLogin(model));
    return this.user$;
  }

  loginWithGoogle(): Observable<AuthenticatedUser> {
    this.store.dispatch(new userActions.ActionGoogleLogin());
    return this.user$;
  }
  loginWithFacebook(): Observable<AuthenticatedUser> {
    this.store.dispatch(new userActions.ActionFacebookLogin());
    return this.user$;
  }
  register(model: any): Observable<AuthenticatedUser> {
    this.store.dispatch(new userActions.ActionRegister(model));
    return this.user$;
  }

  logout(): Observable<AuthenticatedUser> {
    this.store.dispatch(new userActions.ActionLogout());
    return this.user$;
  }
}
