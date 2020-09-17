import { InjectionToken } from '@angular/core';

/**
 * Описание базовых ошибок, характерных для любых полей
 */
export const defaultErrors = {
    required: () => 'Поле обязательно к заполнению',
    minlength: ({ requiredLength, actualLength }) => `Необходимо не менее ${requiredLength}, введено ${actualLength}`,
    maxlength: ({ requiredLength, actualLength }) => `Необходимо не более ${requiredLength}, введено ${actualLength}`,
    pattern: () => 'Не верный формат вводимого значения',
    maskPhone: ({ prefix, maskText }) => `Не соответствует маске ${prefix} ${maskText}`,
    coordinates: value => `${value.value}. Диапазон значений широта: -+180, долгота: +-90`,
};

/**
 * Токен для DI
 */
export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors,
});
