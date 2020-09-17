import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './components';
import { ErrorContainerDirective, FormSubmitDirective, ValidationDirective } from './directives';

const EXPORTS = [ValidationMessageComponent, ErrorContainerDirective, FormSubmitDirective, ValidationDirective];

/**
 * Модуль валидации
 */
@NgModule({
    declarations: EXPORTS,
    exports: EXPORTS,
    imports: [CommonModule],
    entryComponents: [ValidationMessageComponent],
})
export class ValidationModule {}
