import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HelloModule } from './hello/hello.module';

import { AppComponent } from './app.component';
import { NgReduxModule, NgRedux } from 'ng2-redux';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HelloModule,
    NgReduxModule.forRoot(),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ngRedux: NgRedux<any>) {
    const INITIAL_STATE = {
      message: 'Hello World!',
      x: 1,
      y: 2,
    };
    let reducer = (state = INITIAL_STATE, action) => {
      return state;
    };

    ngRedux.configureStore(reducer, undefined);
  }
}
