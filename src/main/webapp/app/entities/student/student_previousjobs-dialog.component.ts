import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager, AlertService} from 'ng-jhipster';

import {Previousjobs} from '../previousjobs/previousjobs.model';
import {PreviousjobsPopupService} from '../previousjobs/previousjobs-popup.service';
import {PreviousjobsService} from '../previousjobs/previousjobs.service';
import {Student, StudentService} from '../student';
import {Company, CompanyService} from '../company';
import {Title, TitleService} from '../title';

@Component({
    selector: 'jhi-previousjobs-dialog-by-student',
    templateUrl: './student_previousjobs-dialog.component.html'
})
export class PreviousjobsDialogComponentByStudent implements OnInit {

    previousjobs: Previousjobs;
    authorities: any[];
    isSaving: boolean;
    companies: Company[];

    titles: Title[];

    constructor(public activeModal: NgbActiveModal,
                private alertService: AlertService,
                private previousjobsService: PreviousjobsService,
                private studentService: StudentService,
                private companyService: CompanyService,
                private titleService: TitleService,
                private eventManager: EventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.companyService.query().subscribe(
            (res: Response) => {
                this.companies = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.titleService.query().subscribe(
            (res: Response) => {
                this.titles = res.json();
            }, (res: Response) => this.onError(res.json()));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        console.log(this.previousjobs);
        this.previousjobsService.create(this.previousjobs)
            .subscribe((res: Previousjobs) =>
                this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));

    }

    private onSaveSuccess(result: Previousjobs) {
        this.eventManager.broadcast({name: 'studentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
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
    selector: 'jhi-previousjobs-popup-by-student',
    template: ''
})
export class PreviousjobsPopupComponentByStudent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
                private previousjobsPopupService: PreviousjobsPopupService) {
    }

    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            if (params['idstud']) {
                this.modalRef = this.previousjobsPopupService
                    .openWithStudentAlreadySet(PreviousjobsDialogComponentByStudent, params['idstud']);
            } else {
                this.modalRef = this.previousjobsPopupService
                    .open(PreviousjobsDialogComponentByStudent);
            }

        });


    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
