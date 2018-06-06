import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentjobsSharedModule } from '../../shared';

import {
    StudentService,
    StudentPopupService,
    StudentComponent,
    StudentDetailComponent,
    StudentDialogComponent,
    StudentPopupComponent,
    StudentDeletePopupComponent,
    StudentDeleteDialogComponent,
    studentRoute,
    studentPopupRoute,
} from './';
import {
    PreviousjobsDialogComponentByStudent,
    PreviousjobsPopupComponentByStudent
} from "./student_previousjobs-dialog.component";

let ENTITY_STATES = [
    ...studentRoute,
    ...studentPopupRoute,
];

@NgModule({
    imports: [
        StudentjobsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        StudentComponent,
        StudentDetailComponent,
        StudentDialogComponent,
        StudentDeleteDialogComponent,
        StudentPopupComponent,
        StudentDeletePopupComponent
    ],
    entryComponents: [
        StudentComponent,
        StudentDialogComponent,
        StudentPopupComponent,
        StudentDeleteDialogComponent,
        StudentDeletePopupComponent
    ],
    providers: [
        StudentService,
        StudentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentjobsStudentModule {}
