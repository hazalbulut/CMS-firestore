import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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
    constructor(zone: NgZone, private router: Router) {

        // tslint:disable-next-line: deprecation
        this.mediaMatcher.addListener(mql =>
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
    }

    @Input() public mode;

    public ngOnInit() {

        if (this.isScreenSmall()) {
            this.checkMode = 'over';
        } else {
            this.checkMode = 'side';
        }
        console.log(this.mediaMatcher.matches);
    }
    public isScreenSmall() {
        return this.mediaMatcher.matches;
    }
}


