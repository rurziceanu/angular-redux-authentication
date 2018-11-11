
// angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// rxjs
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// app
import { AuthenticatedUser } from '../store/auth-user.model';
import { AuthenticationService } from '../store/auth.service';
import { AlertService, AlertMessage } from '../../../shared/components/alert';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    user$: Observable<AuthenticatedUser> = this.authenticationService.user$;
    returnUrl: string;
    loginForm: FormGroup;
    submited = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
        ) {
            this.loginForm = this.formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required]
              });
    }

    ngOnInit() {
        // reset login status
        this.logout();

        // get return url from route parameters or default to '/home'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // getter for easy access to form fields
    get f() {
        if (this.loginForm) {
            return this.loginForm.controls;
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onGoogleLogin() {
        this.authenticationService
            .loginWithGoogle()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                data => {
                    if (data !== undefined && data.uid !== null && data.error !== '') {
                        // login was successful, then redirect to url
                        this.router.navigate([this.returnUrl]);
                    } else if (data !== undefined && data.error !== undefined && data.error !== '') {
                        // an error has ocured, show the error in the ui
                        this.createErrorAlert(data.error);
                    }
                },
                error => {
                    this.createErrorAlert(error.message);
                });
    }

    onFacebookLogin() {
        this.authenticationService
            .loginWithFacebook()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                data => {
                    if (data !== undefined && data.uid !== null && data.error !== '') {
                        // login was successful, then redirect to url
                        this.router.navigate([this.returnUrl]);
                    } else if (data !== undefined && data.error !== undefined && data.error !== '') {
                        // an error has ocured, show the error in the ui
                        this.createErrorAlert(data.error);
                    }
                },
                error => {
                    this.createErrorAlert(error.message);
                });
    }

    login() {
        this.submited = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.authenticationService
            .login(this.loginForm.value)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                data => {
                    if (data !== undefined && data.uid !== null && data.error !== '') {
                        // login was successful, then redirect to url
                        this.router.navigate([this.returnUrl]);
                    } else if (data !== undefined && data.error !== undefined && data.error !== '') {
                        // an error has ocured, show the error in the ui
                        this.createErrorAlert(data.error);
                    }
                },
                error => {
                    this.createErrorAlert(error.message);
                });
    }

    logout() {
        this.authenticationService.logout();
    }

    private createErrorAlert(content: string) {
        window.scrollTo(0, 0);
        const message = new AlertMessage();
        message.message = content;
        message.dismissible = true;
        this.alertService.error(message, false);
    }
}
