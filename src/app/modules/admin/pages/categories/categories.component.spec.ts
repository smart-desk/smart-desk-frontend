import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService, CategoryServiceFake, ModelService, ModelServiceFake } from 'src/app/core/services';
import { UIComponentsForTests } from 'src/app/spec/admin';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
    let component: CategoriesComponent;
    let fixture: ComponentFixture<CategoriesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [...UIComponentsForTests, NoopAnimationsModule],
            declarations: [CategoriesComponent],
            providers: [
                { provide: ModelService, useClass: ModelServiceFake },
                { provide: CategoryService, useClass: CategoryServiceFake },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
