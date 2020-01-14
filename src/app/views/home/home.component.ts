import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { UserCardFirestore } from 'src/app/services/firestore/user-card.firestore';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'

})

export class HomeComponent implements OnInit {
    public selected: string;

    public userForm = this.fb.group({
        name: new FormControl(''),
        password: new FormControl(''),
        gender: new FormControl('')
    });
    UserCardFirestore: any;

    constructor(private fb: FormBuilder, public dialog: MatDialog, public userCardFirestore: UserCardFirestore) {
        //
    }

    public ngOnInit() {
        //
    }

    public onSubmit(formValue: User): void {
        this.userCardFirestore.addUser(formValue);
        this.userCardFirestore.openDialog(formValue);
    }
}
