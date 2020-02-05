import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './model/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserCardFirestore } from './services/firestore/user-card.firestore';
const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'demoCms';
    public checkMode: string = 'side';
    public userData: User[];
    public routerOptions = { exact: true };
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`);
    private unsubscribe: Subject<void> = new Subject();

    constructor(zone: NgZone, public userCardFirestore: UserCardFirestore) {
        this.mediaMatcher.addListener(mql =>
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
    }

    public ngOnInit() {
        this.userCardFirestore.getItems().pipe(takeUntil(this.unsubscribe)).subscribe((fireData) => {
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
