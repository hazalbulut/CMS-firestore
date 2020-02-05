import { Injectable, Inject } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../components/new-contact-dialog/new-contact-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export abstract class UserService<T> {

    public get collection() {
        return this.afs.collection(`${this.basePath}`);
    }

    get serverTimestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }
    public get orderBySth() {
        return this.afs.collection<T>(`${this.basePath}`, (ref) => ref.orderBy('created')).valueChanges({ idField: 'id' });
    }

    constructor(public dialog: MatDialog, @Inject(AngularFirestore) public afs: AngularFirestore) {
        // this.items = this.afs.collection<T>('userCard', (ref) => ref.orderBy('created')).valueChanges({ idField: 'id' });
        this.getItems();
    }

    protected abstract basePath: string;
    public items: Observable<T[]>;


    public getItems(): Observable<T[]> {
        this.items = this.orderBySth;
        return this.items;
    }

    public userById(id: string): Observable<T> {
        return this.afs.doc<T>(`${this.basePath}/${id}`).valueChanges();
    }

    public addUser(user: T): void {
        const id = this.afs.createId();
        this.collection.doc(id).set(Object.assign({}, user, {
            created: new Date()
        })).then();
    }

    public deleteUserById(userId: string): void {
        this.afs.doc<T>(`${this.basePath}/${userId}`).delete().then();
    }

    public updateUserById(userId: string, value: T): Promise<T> {
        return this.afs.doc<T>(`${this.basePath}/${userId}`).update(value).then();
    }

    public openDialog(user: T): void {
        const dialogRef = this.dialog.open(NewContactDialogComponent, {
            width: '250px',
            data: user
        });
        dialogRef.afterClosed().subscribe();
    }

}

