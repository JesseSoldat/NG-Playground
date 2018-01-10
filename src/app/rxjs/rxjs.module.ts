import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RxjsComponent } from './rxjs.component';

const rxjsRoutes: Routes = [
  { path: '', component: RxjsComponent }
]

@NgModule({
  declarations: [
    RxjsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(rxjsRoutes)
  ],
  exports: [RouterModule]
})
export class RxjsModule { }