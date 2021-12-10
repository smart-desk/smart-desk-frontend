import { Injectable } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root',
})
export class FileSizeControlService {
    bitInMb = 1024;

    constructor(private msg: NzMessageService) {}

    beforeUpload(file: NzUploadFile, sizelimit: number): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            const isLessLimit = file.size && file.size / this.bitInMb / this.bitInMb < sizelimit;
            if (!isLessLimit) {
                this.msg.error(`Изображение не должно превышать ${sizelimit}MB!`);
                observer.complete();
                return;
            }
            observer.next(isLessLimit);
            observer.complete();
        });
    }
}
