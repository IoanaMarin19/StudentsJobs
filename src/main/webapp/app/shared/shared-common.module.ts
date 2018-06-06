import { NgModule, Sanitizer } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AlertService } from 'ng-jhipster';

import {
    StudentjobsSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';


export function alertServiceProvider(sanitizer: Sanitizer) {
    // set below to true to make alerts look like toast
    let isToast = false;
    return new AlertService(sanitizer, isToast);
}

@NgModule({
    imports: [
        StudentjobsSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        {
            provide: AlertService,
            useFactory: alertServiceProvider,
            deps: [Sanitizer]
        },
        Title
    ],
    exports: [
        StudentjobsSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class StudentjobsSharedCommonModule {}
