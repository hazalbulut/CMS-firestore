
import { NgModule } from '@angular/core';
import {

    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule
} from '@angular/material';


@NgModule({
    imports: [
        MatCardModule,
        MatDialogModule,
        MatSidenavModule,
        MatSelectModule,
        MatToolbarModule,
        MatListModule

    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule
    ]
})
export class MaterialModule {

}
