import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';

@Component({
    selector: 'app-new-contact-dialog',
    templateUrl: './new-contact-dialog.component.html',
    styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {


    constructor(public dialogRef: MatDialogRef<NewContactDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: User) { }
    public ngOnInit() {
        //
    }

    public onOkClick(): void {
        this.dialogRef.close();
    }



}
