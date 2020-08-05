import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIComponentsForTests } from 'src/app/spec/admin';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TextareaComponent],
            imports: [ReactiveFormsModule, FormsModule, ...UIComponentsForTests],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
