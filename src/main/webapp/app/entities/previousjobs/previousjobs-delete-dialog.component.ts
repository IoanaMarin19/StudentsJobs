import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Previousjobs } from './previousjobs.model';
import { PreviousjobsPopupService } from './previousjobs-popup.service';
import { PreviousjobsService } from './previousjobs.service';

@Component({
    selector: 'jhi-previousjobs-delete-dialog',
    templateUrl: './previousjobs-delete-dialog.component.html'
})
export class PreviousjobsDeleteDialogComponent {

    previousjobs: Previousjobs;

    constructor(
        private previousjobsService: PreviousjobsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.previousjobsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'previousjobsListModification',
                content: 'Deleted an previousjobs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-previousjobs-delete-popup',
    template: ''
})
export class PreviousjobsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private previousjobsPopupService: PreviousjobsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.previousjobsPopupService
                .open(PreviousjobsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
