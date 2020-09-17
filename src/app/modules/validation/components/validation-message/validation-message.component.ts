import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

/**
 * Компонента отвечает за отображение сообщений о валидации
 */
@Component({
    selector: 'bg-validation-message',
    templateUrl: './validation-message.component.html',
    styleUrls: ['./validation-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent {
    private internalMessages: string[];
    private internalHide = true;

    /**
     * Сообщения об ошибках
     * @param messages отображаемые сообщения
     */
    @Input() public set messages(messages: string[]) {
        this.internalMessages = messages;
        this.internalHide = false;
        this.cdr.detectChanges();
    }

    public get messages(): string[] {
        return this.internalMessages;
    }

    /**
     * Показываем или нет
     * @param value фдаг показа сообщения
     */
    @Input() public set hide(value: boolean) {
        this.internalHide = value;
        this.cdr.detectChanges();
    }

    public get hide(): boolean {
        return this.internalHide;
    }

    /**
     * @ignore
     * @param cdr
     */
    constructor(private cdr: ChangeDetectorRef) {}
}
