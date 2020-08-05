import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ModelService, ModelServiceFake, SectionService, SectionServiceFake } from 'src/app/core/services';
import { CreateModelComponent } from './create-model.component';

describe('CreateModelComponent', () => {
    let component: CreateModelComponent;
    let fixture: ComponentFixture<CreateModelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateModelComponent],
            providers: [
                { provide: ModelService, useClass: ModelServiceFake },
                { provide: SectionService, useClass: SectionServiceFake },
                {
                    provide: Router,
                    useValue: {
                        navigate(...args: any): void {},
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
