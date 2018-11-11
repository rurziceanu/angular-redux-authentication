// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// app
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Log In'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: 'Sign Up'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
