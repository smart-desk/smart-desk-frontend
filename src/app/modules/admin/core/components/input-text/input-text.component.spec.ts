import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatorFieldInputTextService, CreatorFieldInputTextServiceFake, FieldService, FieldServiceFake } from 'src/app/core/services';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
    let component: InputTextComponent;
    let fixture: ComponentFixture<InputTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputTextComponent],
            providers: [
                { provide: FieldService, useClass: FieldServiceFake },
                { provide: CreatorFieldInputTextService, useClass: CreatorFieldInputTextServiceFake },
            ],
            imports: [ReactiveFormsModule],
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
