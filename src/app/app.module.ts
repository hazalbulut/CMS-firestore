import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HomeModule } from './views/home/home.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserCardModule } from './views/user-card/user-card.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeRoutingModule } from './views/home/home-routing.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        MaterialModule,
        HomeModule,
        CommonModule,
        UserCardModule,
        AngularFireModule.initializeApp(environment.firebase, 'firstProject'),
        AngularFirestoreModule,
        HomeRoutingModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
