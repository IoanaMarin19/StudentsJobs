import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Previousjobs } from './previousjobs.model';
import { PreviousjobsService } from './previousjobs.service';

@Component({
    selector: 'jhi-previousjobs-detail',
    templateUrl: './previousjobs-detail.component.html'
})
export class PreviousjobsDetailComponent implements OnInit, OnDestroy {

    previousjobs: Previousjobs;
    private subscription: any;

    constructor(
        private previousjobsService: PreviousjobsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.previousjobsService.find(id).subscribe(previousjobs => {
            this.previousjobs = previousjobs;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
