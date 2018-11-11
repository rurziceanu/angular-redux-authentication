import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, AlertService } from './index';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent
    ],
    providers: [
        AlertService
    ],
    exports: [
        AlertComponent
    ]
})
export class AlertModule { }
