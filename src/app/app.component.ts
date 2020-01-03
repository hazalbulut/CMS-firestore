import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { User } from './model/user';
const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`);

    public title = 'demoCms2';
    public showFiller = false;
    public checkMode: string;
    public userData: User[];
    constructor(zone: NgZone, private router: Router, private userService: UserService) {

        this.mediaMatcher.addListener(mql =>
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
    }

    @Input() public mode;

    public ngOnInit() {
        this.userService.getItems().subscribe((fireData) => {
            this.userData = fireData;
        });

        if (this.isScreenSmall()) {
            this.checkMode = 'over';
        } else {
            this.checkMode = 'side';
        }
    }
    public isScreenSmall() {
        return this.mediaMatcher.matches;
    }
}


