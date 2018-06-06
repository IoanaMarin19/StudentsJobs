import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentPopupComponent } from './student-dialog.component';
import { StudentDeletePopupComponent } from './student-delete-dialog.component';

import { Principal } from '../../shared';
import {PreviousjobsPopupComponentByStudent} from "./student_previousjobs-dialog.component";


export const studentRoute: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Students'
    }
  }, {
    path: 'student/:id',
    component: StudentDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Students'
    }
  }
];

export const studentPopupRoute: Routes = [
  {
    path: 'student-new',
    component: StudentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Students'
    },
    outlet: 'popup'
  },
    {
        path: 'previousjobsbystudent-new/:idstud',
        component: PreviousjobsPopupComponentByStudent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Previousjobs'
        },
        outlet: 'popup'
    },
  {
    path: 'student/:id/edit',
    component: StudentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Students'
    },
    outlet: 'popup'
  },
  {
    path: 'student/:id/delete',
    component: StudentDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Students'
    },
    outlet: 'popup'
  }
];
