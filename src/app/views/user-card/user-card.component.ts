import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject();
    public user: User;
    public show: boolean;
    public urlId: string;
    public selected: string;
    public isUpdate: boolean = false;
    public userForm = this.fb.group({
        name: new FormControl(''),
        password: new FormControl(''),
        gender: new FormControl('')
    });

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, ) { }

    public ngOnInit() {
        this.getIdFromURL();
    }

    public getIdFromURL() {
        this.route.params.subscribe((params) => {
            this.urlId = params.id;
            this.userService.userById(this.urlId).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
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

    public updateUser(formValue: User) {
        this.userService.updateUserById(this.urlId, formValue);
        this.isUpdate = false;
    }

    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
