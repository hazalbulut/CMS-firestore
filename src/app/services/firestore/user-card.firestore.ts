import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root'
})
export class UserCardFirestore extends UserService<User> {
    protected basePath: string = 'userCard';
}
