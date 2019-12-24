import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'

})

export class HomeComponent implements OnInit {

    private _users: BehaviorSubject<User[]>;

    private dataStore: {
        users: User[];
    };

    get users(): Observable<User[]> {
        return this._users.asObservable();
    }

    public selected: "Female";
    public user: User = new User();
    public name = new FormControl('', [Validators.required]);
    public password = new FormControl('', [Validators.required]);
    public gender = new FormControl('', [Validators.required]);


    constructor(public dialog: MatDialog, public userService: UserService) {
    }

    public ngOnInit() {
        this.userService.loadAll()
    }


    public save() {
        this.userService.addUser(this.user);
        this.userService.openDialog();

    }
}

