import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentjobsSharedModule } from '../../shared';
import {
    PreviousjobsDialogComponentByStudent,
    PreviousjobsPopupComponentByStudent
} from '../student/student_previousjobs-dialog.component';

import {
    PreviousjobsService,
    PreviousjobsPopupService,
    PreviousjobsComponent,
    PreviousjobsDetailComponent,
    PreviousjobsDialogComponent,
    PreviousjobsPopupComponent,
    PreviousjobsDeletePopupComponent,
    PreviousjobsDeleteDialogComponent,
    previousjobsRoute,
    previousjobsPopupRoute,
} from './';

let ENTITY_STATES = [
    ...previousjobsRoute,
    ...previousjobsPopupRoute,
];

@NgModule({
    imports: [
        StudentjobsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PreviousjobsComponent,
        PreviousjobsDetailComponent,
        PreviousjobsDialogComponent,
        PreviousjobsDialogComponentByStudent,
        PreviousjobsDeleteDialogComponent,
        PreviousjobsPopupComponent,
        PreviousjobsPopupComponentByStudent,
        PreviousjobsDeletePopupComponent,
    ],
    entryComponents: [
        PreviousjobsComponent,
        PreviousjobsDialogComponent,
        PreviousjobsDialogComponentByStudent,
        PreviousjobsPopupComponent,
        PreviousjobsPopupComponentByStudent,
        PreviousjobsDeleteDialogComponent,
        PreviousjobsDeletePopupComponent,
    ],
    providers: [
        PreviousjobsService,
        PreviousjobsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentjobsPreviousjobsModule {}
