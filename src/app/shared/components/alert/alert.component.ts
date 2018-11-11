import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AlertService } from './alert.service';
import { AlertMessage } from './alert.model';


@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    message: AlertMessage;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        const self = this;
        this.alertService.getMessage()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(message => { self.onMessageReceived(message); });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onMessageReceived(newMessage: AlertMessage) {
        if (newMessage == null) {
            this.message = null;
            return;
        }
        const self = this;
        self.message = newMessage;
        if (self.message !== undefined && self.message !== null && self.message.autoClose) {
            setTimeout(() => self.message = null, 5000);
        }
    }

    public closeAlert() {
        this.message = null;
    }
}
