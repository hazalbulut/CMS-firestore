import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../components/new-contact-dialog/new-contact-dialog.component';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _users: BehaviorSubject<User[]>;

    private dataStore: {
        users: User[];
    };
    public itemsCollection: AngularFirestoreCollection<User>;
    public items: Observable<any[]>;
    public lastData: User;
    // public editState: boolean = false;
    // public itemToEdit: User;

    constructor(public dialog: MatDialog, public afs: AngularFirestore) {
        this.items = this.afs.collection('userCard').valueChanges({ idField: 'id' });
        this.dataStore = { users: [] };
        this._users = new BehaviorSubject<User[]>([]);
    }

    get users(): Observable<User[]> {
        return this._users.asObservable();
    }

    public getItems() {
        return this.items;
    }

    public userById(id: string): Observable<User> {
        return this.afs.doc<User>('userCard/' + id).valueChanges();
    }

    public addUser(user: User) {
        const id = this.afs.createId();
        this.afs.collection('userCard').doc(id).set(Object.assign({}, user)).then();
    }

    public deleteUserById(userId: string) {
        console.log(userId);
        this.afs.doc<User>('userCard/' + userId).delete().then();
    }
    public updateUserById(userId: string, value: User) {
        return this.afs.doc<User>('userCard/' + userId).update(value).then();
    }

    // public openDialog(): void {
    //     this.getItems().subscribe(data => {
    //         this.lastData = data[data.length - 1];
    //         console.log(this.lastData);
    //     });
    //     // let tempData: User;
    //     // tempData = this.dataStore.users[this.dataStore.users.length - 1];
    //     // console.log('son data', tempData);
    //     const dialogRef = this.dialog.open(NewContactDialogComponent, {
    //         width: '250px',
    //         data: this.lastData
    //     });
    //     dialogRef.afterClosed().subscribe();
    // }

}

