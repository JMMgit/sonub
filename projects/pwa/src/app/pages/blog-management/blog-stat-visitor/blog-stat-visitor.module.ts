import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogStatVisitorComponent } from './blog-stat-visitor.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ComponentServiceModule } from '../../../../../../../share/philgo-api-components/service/component.service.module';


const routes: Routes = [
  {
    path: '',
    component: BlogStatVisitorComponent
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ComponentServiceModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [BlogStatVisitorComponent]
})
export class BlogStatVisitorModule { }
