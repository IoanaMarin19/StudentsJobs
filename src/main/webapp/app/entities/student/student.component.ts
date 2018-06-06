import {Component, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {EventManager, ParseLinks, PaginationUtil, AlertService} from 'ng-jhipster';

import {Student} from './student.model';
import {StudentService} from './student.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';
import {Previousjobs} from "../previousjobs/previousjobs.model";
import {PreviousjobsService} from "../previousjobs/previousjobs.service";

@Component({
    selector: 'jhi-student',
    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit, OnDestroy {

    students: Student[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(private studentService: StudentService,
                private previousJobsService: PreviousjobsService,
                private alertService: AlertService,
                private eventManager: EventManager,
                private parseLinks: ParseLinks,
                private principal: Principal) {
        this.students = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }


    loadAll() {
        this.studentService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: Response) => this.onSuccess(res.json(), res.headers),
            (res: Response) => this.onError(res.json())
        );


    }

    reset() {
        this.page = 0;
        this.students = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStudents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Student) {
        return item.id;
    }


    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe('studentListModification', (response) => this.reset());
    }

    sort() {
        let result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.previousJobsService.findByStudent(data[i].id).subscribe(previousjobs => {
                data[i].previousJobs = previousjobs;
            });
            this.students.push(data[i]);
        }

    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
