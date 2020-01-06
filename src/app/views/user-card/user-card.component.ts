import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

    public user: User;
    public updatedUser: User;
    public show: boolean;
    public urlId: string;
    public selected: string = 'Female';
    public isUpdate: boolean = false;
    public userForm = new FormGroup({
        name: new FormControl(''),
        password: new FormControl(''),
        gender: new FormControl('')
    });

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }
    public ngOnInit() {
        this.shotIdFromURL();
    }
    public shotIdFromURL() {
        this.route.params.subscribe((params) => {
            this.urlId = params.id;
            this.userService.userById(this.urlId).subscribe((res) => {
                this.user = res;
                this.show = true;
            });
        });
    }
    public deleteUser() {
        this.userService.deleteUserById(this.urlId);
        this.router.navigate(['/']);
    }
    public showUpdateSection() {
        this.isUpdate = true;
    }

    public updateUser(user: User) {
        this.userService.updateUserById(this.urlId, user);
        this.isUpdate = false;
    }

}
