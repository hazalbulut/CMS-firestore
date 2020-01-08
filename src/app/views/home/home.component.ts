import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'

})

export class HomeComponent implements OnInit {
    public selected: string;

    public userForm = this.fb.group({
        name: new FormControl(''),
        password: new FormControl(''),
        gender: new FormControl('')
    });

    constructor(private fb: FormBuilder, public dialog: MatDialog, public userService: UserService) {
        //
    }

    public ngOnInit() {
        //
    }

    public onSubmit(formValue: User): void {
        this.userService.addUser(formValue);
        this.userService.openDialog(formValue);
    }
}
