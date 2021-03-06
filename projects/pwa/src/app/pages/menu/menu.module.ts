import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';


const routes: Routes = [
    {
        path: '',
        component: MenuComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RouterModule,
        MatListModule
    ],
    exports: [],
    declarations: [MenuComponent],
    providers: [],
})
export class MenuModule { }
