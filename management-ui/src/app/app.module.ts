import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatToolbarModule, MatIconModule, MatSidenavModule, NoopAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
