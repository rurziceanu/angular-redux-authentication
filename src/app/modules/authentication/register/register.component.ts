// angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// app
import { AuthenticationService } from '../store/auth.service';
import { AlertMessage, AlertService } from '../../../shared/components/alert';
import { MustMatch } from '../../../shared/helpers/validators/must-match.validator';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnDestroy, OnInit {
    private unsubscribe$: Subject<void> = new Subject<void>();
    loading = false;
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
                validator: MustMatch('password', 'confirmPassword')
            });
    }

    get f() {
        if (this.registerForm) {
            return this.registerForm.controls;
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    register() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService
            .register(this.registerForm.value)
            .pipe(
                takeUntil(this.unsubscribe$),
            )
            .subscribe(
                data => {
                    if (data !== undefined && data.error !== undefined && data.error !== '') {
                        this.loading = false;
                        const message = new AlertMessage();
                        message.message = data.error;
                        this.alertService.error(message);
                    } else if (data !== undefined && data.uid !== null) {
                        // user registerd and loged in
                        // we redirect to login page
                        // you can also redirect user to home page directly as the user is already authentificated
                        this.loading = false;
                        const message = new AlertMessage();
                        message.message = 'Registration successful. You can now login.';
                        this.alertService.success(message, true);
                        this.router.navigate(['/auth/login']);
                    }
                },
                error => {
                    window.scrollTo(0, 0);
                    const message = new AlertMessage();
                    message.message = error.message;
                    this.alertService.error(message, false);
                    this.loading = false;
                }
            );
    }
}
