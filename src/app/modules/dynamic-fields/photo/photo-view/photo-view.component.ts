import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { PhotoEntity } from '../../../../shared/models/dto/field-data/photo.entity';
import { PhotoParamsDto } from '../../../../shared/models/dto/field-data/photo-params.dto';

@Component({
    selector: 'app-photo-view',
    templateUrl: './photo-view.component.html',
    styleUrls: ['./photo-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoViewComponent extends AbstractFieldViewComponent<PhotoEntity, PhotoParamsDto> implements OnInit {
    ngOnInit(): void {}
}
