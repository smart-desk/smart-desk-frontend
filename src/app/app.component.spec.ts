import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'Welcome to magic Smart Desk'`, () => {
        expect(component.title).toContain('Welcome to magic Smart Desk');
    });

    it('should render title', () => {
        const titleDe = fixture.debugElement.query(By.css('[data-test-app-title]'));

        expect(titleDe).toBeTruthy('App title should be in the DOM');
        expect(titleDe.nativeElement.textContent).toContain('Welcome to magic Smart Desk');
    });
});
