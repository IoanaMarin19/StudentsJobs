import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Student } from './student.model';
import { StudentPopupService } from './student-popup.service';
import { StudentService } from './student.service';
import { Company, CompanyService } from '../company';
import { Title, TitleService } from '../title';

@Component({
    selector: 'jhi-student-dialog',
    templateUrl: './student-dialog.component.html'
})
export class StudentDialogComponent implements OnInit {

    student: Student;
    authorities: any[];
    isSaving: boolean;

    companies: Company[];

    titles: Title[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private studentService: StudentService,
        private companyService: CompanyService,
        private titleService: TitleService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
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
        if (this.student.id !== undefined) {
            this.studentService.update(this.student)
                .subscribe((res: Student) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.studentService.create(this.student)
                .subscribe((res: Student) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Student) {
        this.eventManager.broadcast({ name: 'studentListModification', content: 'OK'});
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

    trackCompanyById(index: number, item: Company) {
        return item.id;
    }

    trackTitleById(index: number, item: Title) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-student-popup',
    template: ''
})
export class StudentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private studentPopupService: StudentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.studentPopupService
                    .open(StudentDialogComponent, params['id']);
            } else {
                this.modalRef = this.studentPopupService
                    .open(StudentDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
