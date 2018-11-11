// this file is the core app module

// angular
import { CommonModule } from '@angular/common';
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// font awesome 5 icons
// font awesome icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// we add all icons (fas, far, fab) to the library for convenient use.
library.add(fas, far, fab);

import { environment } from '../../environments/environment';

// store
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/app.reducer';
import { AuthEffects } from '../modules/authentication/store/auth.effects';


@NgModule({
  imports: [
    // angular
    HttpClientModule,

    // firebase init
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    // font awesome icons
    FontAwesomeModule,

    // redux store
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
  ],
  declarations: [],
  providers: []
})
export class AppCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppCoreModule
  ) {
    if (parentModule) {
      throw new Error('AppCoreModule is already loaded. Import only in AppModule');
    }
  }
}
