import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StudentjobsCompanyModule } from './company/company.module';
import { StudentjobsTitleModule } from './title/title.module';
import { StudentjobsStudentModule } from './student/student.module';
import { StudentjobsPreviousjobsModule } from './previousjobs/previousjobs.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        StudentjobsCompanyModule,
        StudentjobsTitleModule,
        StudentjobsStudentModule,
        StudentjobsPreviousjobsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentjobsEntityModule {}
