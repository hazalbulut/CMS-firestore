import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

    public user: User;

    constructor(private route: ActivatedRoute, private userService: UserService) { }
    public ngOnInit() {
        this.route.params.subscribe((params) => {
            const id = params.id;

            this.userService.users.subscribe(users => {
                if (users.length === 0) {
                    return;
                }
                setTimeout(() => {
                    this.user = this.userService.userById(Number(id));
                });

            });
        });
    }




}
