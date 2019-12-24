import { Injectable } from '@angular/core';
import { User } from '../model/user'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../components/new-contact-dialog/new-contact-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _users: BehaviorSubject<User[]>;

    private dataStore: {
        users: User[];
    };
    constructor(public dialog: MatDialog) {
        this.dataStore = { users: [] };
        this._users = new BehaviorSubject<User[]>([]);
    }

    get users(): Observable<User[]> {
        return this._users.asObservable();
    }

    public userById(id: number) {
        console.log(this.dataStore.users);
        return this.dataStore.users.find((x) => x.id === id);
    }

    public loadAll() {
        return this._users
            .subscribe((data) => {
                this.dataStore.users = data;
                this._users.next(Object.assign({}, this.dataStore).users);
            },
                (error) => {
                    console.log('Failed to fetch users');
                });
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
        let temp_data: User;
        temp_data = this.dataStore.users[this.dataStore.users.length - 1];
        console.log('son data', temp_data);
        const dialogRef = this.dialog.open(NewContactDialogComponent, {
            width: '250px',
            data: temp_data
        });
        dialogRef.afterClosed().subscribe();
    }
}

