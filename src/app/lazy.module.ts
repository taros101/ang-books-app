import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LazyLoadingComponent } from './components/lazy-loading/lazy-loading.component'
import { MaterialModule } from './material/material.module';

const routes: Routes = [
  { path: "lazy", component: LazyLoadingComponent }
];

@NgModule({
  declarations: [
    LazyLoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyModule { }
