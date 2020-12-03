import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { PhotoEntity } from '../../../../shared/models/dto/field-data/photo.entity';
import { PhotoParamsDto } from '../../../../shared/models/dto/field-data/photo-params.dto';
import { ImageItem } from 'ng-gallery';

@Component({
    selector: 'app-photo-view',
    templateUrl: './photo-view.component.html',
    styleUrls: ['./photo-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoViewComponent extends AbstractFieldViewComponent<PhotoEntity, PhotoParamsDto> implements OnInit {
    images: ImageItem[] = [];

    ngOnInit() {
        if (this.field.data && this.field.data.value) {
            this.images = this.field.data.value.map(url => new ImageItem({ src: url, thumb: url }));
        }
    }
}
