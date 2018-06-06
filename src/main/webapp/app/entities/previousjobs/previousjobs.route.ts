import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PreviousjobsComponent } from './previousjobs.component';
import { PreviousjobsDetailComponent } from './previousjobs-detail.component';
import { PreviousjobsPopupComponent } from './previousjobs-dialog.component';
import { PreviousjobsDeletePopupComponent } from './previousjobs-delete-dialog.component';

import { Principal } from '../../shared';


export const previousjobsRoute: Routes = [
  {
    path: 'previousjobs',
    component: PreviousjobsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Previousjobs'
    }
  }, {
    path: 'previousjobs/:id',
    component: PreviousjobsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Previousjobs'
    }
  }
];

export const previousjobsPopupRoute: Routes = [
  {
    path: 'previousjobs-new',
    component: PreviousjobsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Previousjobs'
    },
    outlet: 'popup'
  },
  {
    path: 'previousjobs/:id/edit',
    component: PreviousjobsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Previousjobs'
    },
    outlet: 'popup'
  },
  {
    path: 'previousjobs/:id/delete',
    component: PreviousjobsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Previousjobs'
    },
    outlet: 'popup'
  }
];
