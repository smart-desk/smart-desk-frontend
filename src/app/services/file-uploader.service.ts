import { Injectable } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root',
})
export class FileUploaderService {
    bitInMb = 1024 * 1024;

    constructor(private msg: NzMessageService) {}

    beforeUpload(file: NzUploadFile, sizelimitMb: number): boolean {
        const isLessLimit = !!(file.size && file.size / this.bitInMb < sizelimitMb);
        if (!isLessLimit) {
            this.msg.error(`Изображение не должно превышать ${sizelimitMb}MB!`);
        }
        return isLessLimit;
    }
}
