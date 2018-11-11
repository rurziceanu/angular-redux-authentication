import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AuthGuardService } from './modules/authentication/store/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    data: { title: 'Home ' }
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: 'src/app/modules/authentication/authentication.module#AuthenticationModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent
  ]
})
export class AppRoutingModule { }
