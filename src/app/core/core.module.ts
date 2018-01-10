import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import '../shared/rxjs-operators';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserAnimationsModule,
  ],
  exports: [ 
    BrowserAnimationsModule,
    HeaderComponent
  ],
  providers: [

  ]
})
export class CoreModule {}