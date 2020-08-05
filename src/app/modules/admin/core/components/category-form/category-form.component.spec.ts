import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UIComponentsForTests } from 'src/app/spec/admin';
import { CategoryFormComponent } from './category-form.component';

describe('CategoryFormComponent', () => {
    let component: CategoryFormComponent;
    let fixture: ComponentFixture<CategoryFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, ...UIComponentsForTests, NoopAnimationsModule],
            declarations: [CategoryFormComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
