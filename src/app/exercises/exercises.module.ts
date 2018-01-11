import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesComponent } from './exercises.component';

const exercisesRoutes: Routes = [
  { path: '', component: ExercisesComponent }
]

@NgModule({
  declarations: [
    ExercisesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(exercisesRoutes)
  ],
  exports: [RouterModule]
})
export class ExercisesModule { }