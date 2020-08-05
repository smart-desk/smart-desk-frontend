import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModelService, ModelServiceFake } from 'src/app/core/services';
import { UIComponentsForTests } from 'src/app/spec/admin';
import { ModelsComponent } from './models.component';

describe('ModelsComponent', () => {
    let component: ModelsComponent;
    let fixture: ComponentFixture<ModelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModelsComponent],
            providers: [{ provide: ModelService, useClass: ModelServiceFake }],
            imports: [RouterTestingModule.withRoutes([]), ...UIComponentsForTests],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
