import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ImageItem } from 'ng-gallery';
import { AbstractFieldViewComponent } from '../../../models/abstract-field-view.component';
import { PhotoEntity } from '../dto/photo.entity';
import { PhotoParamsDto } from '../dto/photo-params.dto';

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
            this.images = data.value.map(url => new ImageItem({ src: url, thumb: url }));
        }
    }
}