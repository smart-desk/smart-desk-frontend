import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ImageItem } from 'ng-gallery';
import { AbstractFieldViewComponent } from '../../../models/abstract-field-view.component';
import { PhotoEntity } from '../dto/photo.entity';
import { PhotoParamsDto } from '../dto/photo-params.dto';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-photo-view',
    templateUrl: './photo-view.component.html',
    styleUrls: ['./photo-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoViewComponent extends AbstractFieldViewComponent<PhotoEntity, PhotoParamsDto> implements OnInit {
    images: ImageItem[] = [];

    ngOnInit() {
        const { data } = this.field;
        if (data && data.value) {
            this.images = data.value.map(
                url =>
                    new ImageItem({
                        src: `${environment.imageKitUrlEndpoint}/${url}`,
                        thumb: `${environment.imageKitUrlEndpoint}/${url}?tr=w-150,h-100`,
                    })
            );
        }
    }
}
