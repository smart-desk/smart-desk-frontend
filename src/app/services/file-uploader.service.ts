import { Injectable } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root',
})
export class FileUploaderService {
    bitInKbit = 1024;

    constructor(private msg: NzMessageService) {}

    beforeUpload(file: NzUploadFile, sizelimit: number): boolean {
        const isLessLimit = !!(file.size && file.size / this.bitInKbit / this.bitInKbit < sizelimit);
        if (!isLessLimit) {
            this.msg.error(`Изображение не должно превышать ${sizelimit}MB!`);
        }
        return isLessLimit;
    }
}
