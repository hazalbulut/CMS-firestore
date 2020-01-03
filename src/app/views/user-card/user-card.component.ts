import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

    public user: User;
    public show: boolean;
    public urlId: string;

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
    public updateUser() {
        this.userService.updateUserById(this.urlId);
    }

}
