import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewContactDialogComponent } from 'src/app/components/new-contact-dialog/new-contact-dialog.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
@NgModule({
    imports: [
        MaterialModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // AngularFireModule.initializeApp(environment.firebase, 'firstProject'),
        // AngularFirestoreModule,
        // AngularFireAuthModule,
        // AngularFireStorageModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        NewContactDialogComponent
    ],
    entryComponents: [
        NewContactDialogComponent
    ]
})
export class HomeModule { }
