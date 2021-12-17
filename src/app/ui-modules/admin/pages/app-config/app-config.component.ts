import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { AppConfigService } from '../../../../modules/app-config/app-config.service';
import { environment } from '../../../../../environments/environment';
import { AppConfigEntity } from '../../../../modules/app-config/models/app-config.entity';
import { FileUploaderService } from '../../../../services/file-uploader.service';

@Component({
    selector: 'app-app-config',
    templateUrl: './app-config.component.html',
    styleUrls: ['./app-config.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppConfigComponent implements OnInit {
    file: NzUploadFile[] = [];
    appConfig: AppConfigEntity;
    private sizeLimit = 10;
    constructor(
        private appConfigService: AppConfigService,
        private cd: ChangeDetectorRef,
        private fileSizeControlService: FileUploaderService
    ) {}

    ngOnInit(): void {
        this.appConfigService.getAppConfig().subscribe(res => {
            this.appConfig = res;
            const img = this.appConfig?.logo;
            if (img) {
                this.file = [{ uid: '-1', name: 'image.png', url: environment.s3path + img }];
            }
            this.cd.detectChanges();
        });
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'removed') {
            this.appConfigService.updateAppConfig({ ...this.appConfig, logo: '' }).subscribe();
        } else if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.key;
            this.appConfigService.updateAppConfig({ ...this.appConfig, logo: fileUrl }).subscribe();
        }
    }

    beforeUpload = (file: NzUploadFile): boolean => this.fileSizeControlService.beforeUpload(file, this.sizeLimit);
}
