import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'

})

export class HomeComponent implements OnInit {
    public userCard: Observable<User[]>;

    public selected: string;
    public user: User = new User();
    public userForm = new FormGroup({
        name: new FormControl(''),
        password: new FormControl(''),
        gender: new FormControl('')
    });

    constructor(public dialog: MatDialog, public userService: UserService, db: AngularFirestore) {
        this.userCard = db.collection<User>('userCard').valueChanges();
    }

    public ngOnInit() {
        //
    }

    public onSubmit(): void {
        this.userService.addUser(this.user);
        this.userService.openDialog(this.user);


    }
}

