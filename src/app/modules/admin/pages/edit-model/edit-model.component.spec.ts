import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FieldService, FieldServiceFake, ModelService, ModelServiceFake } from 'src/app/core/services';
import { UIComponentsForTests } from 'src/app/spec/admin';
import { PreviewComponent } from '../../core/components/preview/preview.component';
import { EditModelComponent } from './edit-model.component';

describe('EditModelComponent', () => {
    let component: EditModelComponent;
    let fixture: ComponentFixture<EditModelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditModelComponent, PreviewComponent],
            imports: [RouterTestingModule, ...UIComponentsForTests],
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
