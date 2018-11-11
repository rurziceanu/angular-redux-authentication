import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
// app
import { AuthenticationModule } from '../authentication.module';
import { LoginComponent } from './login.component';
import { AppCoreModule } from '../../../core/app-core.module';
import { AlertModule } from '../../../shared/components/alert/alert.module';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        AuthenticationModule
      ],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
