import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TitleComponent } from './title.component';
import { TitleDetailComponent } from './title-detail.component';
import { TitlePopupComponent } from './title-dialog.component';
import { TitleDeletePopupComponent } from './title-delete-dialog.component';

import { Principal } from '../../shared';


export const titleRoute: Routes = [
  {
    path: 'title',
    component: TitleComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Titles'
    }
  }, {
    path: 'title/:id',
    component: TitleDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Titles'
    }
  }
];

export const titlePopupRoute: Routes = [
  {
    path: 'title-new',
    component: TitlePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Titles'
    },
    outlet: 'popup'
  },
  {
    path: 'title/:id/edit',
    component: TitlePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Titles'
    },
    outlet: 'popup'
  },
  {
    path: 'title/:id/delete',
    component: TitleDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Titles'
    },
    outlet: 'popup'
  }
];
