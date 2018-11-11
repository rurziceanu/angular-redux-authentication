// angular
import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// rxjs
import { takeUntil, filter, map, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    title: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        // set the page title
        this.router.events
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) { route = route.firstChild; }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data)
            )
            .subscribe((event) => {
                this.title = event['title'];
            });

        // scroll top when route change
        this.router.events
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((event) => event instanceof NavigationEnd)
            )
            .subscribe((event) => {
                window.scrollTo(0, 0);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
