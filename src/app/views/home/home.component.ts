import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewContactDialogComponent } from 'src/app/components/new-contact-dialog/new-contact-dialog.component';

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


    constructor(public dialog: MatDialog) {
        this.dataStore = { users: [] };
        this._users = new BehaviorSubject<User[]>([]);
    }

    public ngOnInit() {
    }


    public save() {
        this.addUser(this.user);
        this.openDialog();
    }

    public addUser(user: User): Promise<User> {
        let temp_user = new User();
        temp_user.name = user.name;
        temp_user.password = user.password;
        temp_user.gender = user.gender;
        temp_user.id = this.dataStore.users.length + 1;
        return new Promise((resolver, reject) => {
            this.dataStore.users.push(temp_user);
            this._users.next(Object.assign({}, this.dataStore).users);
            resolver(temp_user);
        });
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(NewContactDialogComponent, {
            width: '250px'
        });
        dialogRef.afterClosed().subscribe();
    }

}
