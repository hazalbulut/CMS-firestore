import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-contact-dialog',
    templateUrl: './new-contact-dialog.component.html',
    styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {
    
    constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) { }

    public ngOnInit() {
//
    }
    public onOkClick():void {
        this.dialogRef.close();
    }
}
