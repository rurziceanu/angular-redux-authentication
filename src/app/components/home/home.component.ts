import { Component, OnInit } from '@angular/core';
// rxjs
import { Observable } from 'rxjs';
// app imports
import { AuthenticatedUser } from '../../modules/authentication/store/auth-user.model';
import { AuthenticationService } from '../../modules/authentication/store/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<AuthenticatedUser> = this.authenticationService.user$;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
