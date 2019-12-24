import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserCardComponent } from './user-card.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'user-card/:id', component: UserCardComponent }
        ])
    ]
})
export class UserCardRoutingModule { }
