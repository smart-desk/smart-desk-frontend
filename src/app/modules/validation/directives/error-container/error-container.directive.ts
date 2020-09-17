import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Данная директива необходима для того, что бы указать контейнер
 * в котором выводить ошибки валидации, если ошибки должны выводиться не под элементом
 */
@Directive({
    selector: '[errorContainer]',
})
export class ErrorContainerDirective {
    constructor(public vcr: ViewContainerRef) {}
}
