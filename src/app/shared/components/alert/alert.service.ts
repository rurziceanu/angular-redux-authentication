import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertMessage } from './alert.model';


@Injectable({
    providedIn: 'root'
})
export class AlertService implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    private subject = new Subject<AlertMessage>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events
        .pipe(
            takeUntil(this.unsubscribe$)
        )
        .subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next(null);
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    success(message: AlertMessage, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        message.type = 'success';
        this.subject.next(message);
    }

    error(message: AlertMessage, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        message.type = 'danger';
        this.subject.next(message);
    }

    warning(message: AlertMessage, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        message.type = 'warning';
        this.subject.next(message);
    }

    info(message: AlertMessage, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        message.type = 'info';
        this.subject.next(message);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
