import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

/**
 * Сервис валидации.
 * Прокидывает подписку для ручсного запуска валидации
 */
@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    private validate: Subject<void> = new Subject<void>();
    /**
     * Подписка на запуск валидации
     */
    public validateObservable: Observable<void> = this.validate.asObservable();

    constructor() {}

    /**
     * Инициируем проверку валидации
     * @param formGroup
     */
    public validateFormGroup(formGroup: FormGroup) {
        formGroup.updateValueAndValidity();
        formGroup.markAllAsTouched();
        this.validate.next();
    }
}
