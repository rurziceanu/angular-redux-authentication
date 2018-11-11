// angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// app
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppCoreModule } from '../../core/app-core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../../shared/components/alert/alert.module';


describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // angular
        NoopAnimationsModule,
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        // app
        AppCoreModule,
        AlertModule,
        // font awesome icons
        FontAwesomeModule
      ],
      declarations: [ AuthenticationComponent, RegisterComponent, LoginComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
