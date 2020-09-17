import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { NgControl, NgForm } from '@angular/forms';

/**
 * Директива создаёт наблюдатель для прослушки события Submit
 */
@Directive({
    selector: 'form',
})
export class FormSubmitDirective implements OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    /**
     * Подписка на событие Submit
     */
    public submitObservable = fromEvent(this.element, 'submit').pipe(
        tap(() => {
            if (!this.element.classList.contains('submitted')) {
                this.element.classList.add('submitted');
            }
        }),
        shareReplay(1),
        takeUntil(this.ngUnsubscribe)
    );

    constructor(private host: ElementRef<HTMLFormElement>) {}

    /**
     * Ссылка на форму
     */
    public get element() {
        return this.host.nativeElement;
    }

    /**
     * @ignore
     */
    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
