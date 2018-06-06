import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PreviousjobsDetailComponent } from '../../../../../../main/webapp/app/entities/previousjobs/previousjobs-detail.component';
import { PreviousjobsService } from '../../../../../../main/webapp/app/entities/previousjobs/previousjobs.service';
import { Previousjobs } from '../../../../../../main/webapp/app/entities/previousjobs/previousjobs.model';

describe('Component Tests', () => {

    describe('Previousjobs Management Detail Component', () => {
        let comp: PreviousjobsDetailComponent;
        let fixture: ComponentFixture<PreviousjobsDetailComponent>;
        let service: PreviousjobsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [PreviousjobsDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    PreviousjobsService
                ]
            }).overrideComponent(PreviousjobsDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreviousjobsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreviousjobsService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Previousjobs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.previousjobs).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
