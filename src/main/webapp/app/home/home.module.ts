import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentjobsSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';


@NgModule({
    imports: [
        StudentjobsSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentjobsHomeModule {}
