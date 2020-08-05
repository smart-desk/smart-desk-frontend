import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIComponentsForTests } from 'src/app/spec/admin';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
    let component: InputTextComponent;
    let fixture: ComponentFixture<InputTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputTextComponent],
            imports: [ReactiveFormsModule, FormsModule, ...UIComponentsForTests],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
