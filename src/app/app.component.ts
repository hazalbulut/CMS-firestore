import { Component, Input, OnInit, NgZone, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './model/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`);

    public title = 'demoCms';
    public checkMode: string = 'side';
    public userData: User[];
    private unsubscribe: Subject<void> = new Subject();
    constructor(zone: NgZone, private userService: UserService) {

        this.mediaMatcher.addListener(mql =>
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
    }

    @Input() public mode;
    @Input() public routerLinkActive: string | string[];
    @Input() public routerLinkActiveOptions: { exact: boolean };

    public ngOnInit() {
        this.userService.getItems().pipe(takeUntil(this.unsubscribe)).subscribe((fireData) => {
            this.userData = fireData;
        });

        if (this.isScreenSmall()) {
            this.checkMode = 'over';
        } else {
            this.checkMode = 'side';
        }
    }
    public isScreenSmall(): boolean {
        return this.mediaMatcher.matches;
    }
    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}


