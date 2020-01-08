import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../components/new-contact-dialog/new-contact-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public items: Observable<User[]>;
    constructor(public dialog: MatDialog, public afs: AngularFirestore) {
        this.items = this.afs.collection<User>('userCard', (ref) => ref.orderBy('created')).valueChanges({ idField: 'id' });
    }

    public getItems(): Observable<User[]> {
        return this.items;
    }

    public userById(id: string): Observable<User> {
        return this.afs.doc<User>('userCard/' + id).valueChanges();
    }

    public addUser(user: User): void {
        const id = this.afs.createId();
        this.afs.collection<User>('userCard').doc(id).set(Object.assign({}, user, {
            created: new Date()
        })).then();
    }

    public deleteUserById(userId: string): void {
        this.afs.doc<User>('userCard/' + userId).delete().then();
    }

    public updateUserById(userId: string, value: User): Promise<User> {
        return this.afs.doc<User>('userCard/' + userId).update(value).then();
    }

    public openDialog(user: User): void {
        const dialogRef = this.dialog.open(NewContactDialogComponent, {
            width: '250px',
            data: user
        });
        dialogRef.afterClosed().subscribe();
    }

}

