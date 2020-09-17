import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Host,
    Inject,
    Input,
    OnDestroy,
    Optional,
    ViewContainerRef,
} from '@angular/core';
import { AbstractControl, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorContainerDirective } from '../error-container/error-container.directive';
import { FormSubmitDirective } from '../form-submit/form-submit.directive';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValidationMessageComponent } from '../../components';
import { FORM_ERRORS, ValidationService } from '../../services';

/**
 * Директива для подписки на изменения формы или компонента для отображения ошибок валидации
 */
@Directive({
    selector: '[formControl], [formControlName], [formGroup]',
})
export class ValidationDirective implements OnDestroy {
    /**
     * Ссылка на компонент
     */
    ref: ComponentRef<ValidationMessageComponent>;

    /**
     * Ссылка на контейнер
     */
    container: ViewContainerRef;

    /**
     * Подписка на событие submit
     */
    submit$: Observable<Event>;

    /**
     * Кастомная ошибка
     */
    @Input() customErrors = {};

    /** Отписка */
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    /**
     * @ignore
     * @param vcr
     * @param resolver
     * @param validationService
     * @param errorContainer
     * @param errors
     * @param form
     * @param controlDir
     * @param formGroupDir
     */
    constructor(
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private validationService: ValidationService,
        @Optional() errorContainer: ErrorContainerDirective,
        @Inject(FORM_ERRORS) private errors,
        @Optional() @Host() private form: FormSubmitDirective,
        @Optional() private controlDir: NgControl,
        @Optional() private formGroupDir: FormGroupDirective
    ) {
        this.container = errorContainer ? errorContainer.vcr : vcr;
        this.submit$ = this.form ? this.form.submitObservable : EMPTY;
    }

    ngOnInit() {
        /**
         * Подписываемся на события
         */
        merge(this.submit$, this.control.valueChanges, this.control.statusChanges, this.validationService.validateObservable)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                const controlErrors = this.control.errors;
                if (controlErrors) {
                    const keys = Object.keys(controlErrors);
                    const messages: string[] = [];
                    keys.filter((key: string) => this.errors.hasOwnProperty(key) || this.customErrors.hasOwnProperty(key)).forEach(
                        (key: string) => {
                            const getError = this.errors[key];
                            messages.push(this.customErrors[key] || getError(controlErrors[key]));
                        }
                    );
                    this.setError(messages);
                } else if (this.ref) {
                    this.ref.instance.hide = true;
                }
            });
    }

    /**
     * Ссылка на компонент
     */
    get control(): AbstractControl {
        return this.controlDir ? this.controlDir.control : this.formGroupDir.control;
    }

    /**
     * Отображаем ошибки
     * @param messages
     */
    public setError(messages: string[]) {
        if (!this.ref) {
            const factory = this.resolver.resolveComponentFactory(ValidationMessageComponent);
            this.ref = this.container.createComponent(factory);
        }

        this.ref.instance.messages = messages;
    }

    /**
     * @ignore
     */
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
