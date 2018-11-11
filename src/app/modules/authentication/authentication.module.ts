// angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// store
import { authReducer, AUTH_KEY } from './store/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
// app
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertModule } from '../../shared/components/alert/alert.module';


@NgModule({
    imports: [
        CommonModule,
        // angular
        ReactiveFormsModule,
        // app
        AuthenticationRoutingModule,
        AlertModule,
        // font awesome icons
        FontAwesomeModule
    ],
    declarations: [
        AuthenticationComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        AuthenticationComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
    ]
})
export class AuthenticationModule { }
