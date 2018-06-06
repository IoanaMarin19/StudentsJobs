import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Previousjobs } from './previousjobs.model';
import { PreviousjobsPopupService } from './previousjobs-popup.service';
import { PreviousjobsService } from './previousjobs.service';
import { Student, StudentService } from '../student';
import { Company, CompanyService } from '../company';
import { Title, TitleService } from '../title';

@Component({
    selector: 'jhi-previousjobs-dialog',
    templateUrl: './previousjobs-dialog.component.html'
})
export class PreviousjobsDialogComponent implements OnInit {

    previousjobs: Previousjobs;
    authorities: any[];
    isSaving: boolean;

    students: Student[];

    companies: Company[];

    titles: Title[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private previousjobsService: PreviousjobsService,
        private studentService: StudentService,
        private companyService: CompanyService,
        private titleService: TitleService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.studentService.query().subscribe(
            (res: Response) => { this.students = res.json(); }, (res: Response) => this.onError(res.json()));
        this.companyService.query().subscribe(
            (res: Response) => { this.companies = res.json(); }, (res: Response) => this.onError(res.json()));
        this.titleService.query().subscribe(
            (res: Response) => { this.titles = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.previousjobs.id !== undefined) {
            this.previousjobsService.update(this.previousjobs)
                .subscribe((res: Previousjobs) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.previousjobsService.create(this.previousjobs)
                .subscribe((res: Previousjobs) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Previousjobs) {
        this.eventManager.broadcast({ name: 'previousjobsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackStudentById(index: number, item: Student) {
        return item.id;
    }

    trackCompanyById(index: number, item: Company) {
        return item.id;
    }

    trackTitleById(index: number, item: Title) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-previousjobs-popup',
    template: ''
})
export class PreviousjobsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private previousjobsPopupService: PreviousjobsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.previousjobsPopupService
                    .open(PreviousjobsDialogComponent, params['id']);
            } else {
                this.modalRef = this.previousjobsPopupService
                    .open(PreviousjobsDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
