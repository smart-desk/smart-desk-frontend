import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertCreateComponent } from './advert-create.component';

describe('AdvertCreateComponent', () => {
    let component: AdvertCreateComponent;
    let fixture: ComponentFixture<AdvertCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdvertCreateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
