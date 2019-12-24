import { NgModule } from '@angular/core';
import { UserCardComponent } from './user-card.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserCardRoutingModule } from './user-card-routing.module';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        RouterModule,
        UserCardRoutingModule
    ],
    declarations: [
        UserCardComponent,
    ]
})
export class UserCardModule { }
