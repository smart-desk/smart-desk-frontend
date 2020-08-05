import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelService, ModelServiceFake } from 'src/app/core/services';
import { UIComponentsForTests } from 'src/app/spec/admin';
import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
    let component: PreviewComponent;
    let fixture: ComponentFixture<PreviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PreviewComponent],
            providers: [{ provide: ModelService, useClass: ModelServiceFake }],
            imports: [...UIComponentsForTests],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
