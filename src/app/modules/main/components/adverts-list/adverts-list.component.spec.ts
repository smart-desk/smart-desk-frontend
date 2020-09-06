import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertsListComponent } from './adverts-list.component';

describe('AdvertsListComponent', () => {
    let component: AdvertsListComponent;
    let fixture: ComponentFixture<AdvertsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdvertsListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
