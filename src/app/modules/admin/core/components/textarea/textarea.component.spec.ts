import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from 'src/app/core/components/textarea/textarea.component';
import { CreatorFieldTextareaService, CreatorFieldTextareaServiceFake, FieldService, FieldServiceFake } from 'src/app/core/services';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TextareaComponent],
            providers: [
                { provide: FieldService, useClass: FieldServiceFake },
                { provide: CreatorFieldTextareaService, useClass: CreatorFieldTextareaServiceFake },
            ],
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
