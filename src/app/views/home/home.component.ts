import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'

})

export class HomeComponent implements OnInit {
    public userCard: Observable<any[]>;


    private _users: BehaviorSubject<User[]>;

    private dataStore: {
        users: User[];
    };

    get users(): Observable<User[]> {
        return this._users.asObservable();
    }

    public selected: 'Female';
    public user: User = new User();
    public userForm = new FormGroup({
        name: new FormControl(''),
        password: new FormControl(''),
        gender: new FormControl('')
    });

    constructor(public dialog: MatDialog, public userService: UserService, db: AngularFirestore) {
        this.userCard = db.collection('userCard').valueChanges();
    }

    public ngOnInit() {
        //
    }


    public onSubmit() {
        this.userService.addUser(this.user);
        // this.userService.openDialog();

    }
}

