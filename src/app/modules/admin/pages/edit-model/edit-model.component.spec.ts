import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldService, FieldServiceFake, ModelService, ModelServiceFake } from 'src/app/core/services';
import { EditModelComponent } from './edit-model.component';

describe('EditModelComponent', () => {
    let component: EditModelComponent;
    let fixture: ComponentFixture<EditModelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditModelComponent],
            providers: [
                { provide: ModelService, useClass: ModelServiceFake },
                { provide: FieldService, useClass: FieldServiceFake },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
