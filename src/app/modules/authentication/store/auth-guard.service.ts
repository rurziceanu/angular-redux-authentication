// angular
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// rxjs
import { Observable, from } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
// firebase
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('auth guard');
    return from(this.auth.authState)
      .pipe(
        take(1),
        map(auth_state => !!auth_state),
        tap(authenticated => {
          if (!authenticated) { this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } }); }
        })
      );
  }
}
