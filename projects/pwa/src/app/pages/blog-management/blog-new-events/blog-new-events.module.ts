import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogNewEventsComponent } from './blog-new-events.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BlogNewEventsComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogNewEventsComponent]
})
export class BlogNewEventsModule { }
