import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertEditComponent } from './advert-edit.component';

describe('AdvertEditComponent', () => {
    let component: AdvertEditComponent;
    let fixture: ComponentFixture<AdvertEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdvertEditComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
