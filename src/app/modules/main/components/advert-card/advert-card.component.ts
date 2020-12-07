import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { SectionType } from '../../../../shared/models/dto/section.entity';
import { FieldType } from '../../../../shared/models/dto/field.entity';
import { PhotoEntity } from '../../../../shared/models/dto/field-data/photo.entity';

@Component({
    selector: 'app-advert-card',
    templateUrl: './advert-card.component.html',
    styleUrls: ['./advert-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCardComponent {
    @Input() advert: Advert;

    getThumbSrc(): string {
        const section = this.advert.sections.find(s => s.type === SectionType.PARAMS);
        if (!section || !section.fields.length) {
            return;
        }

        const photoField = section.fields.find(f => f.type === FieldType.PHOTO);
        if (photoField) {
            return (photoField.data as PhotoEntity).value[0];
        }
    }
}
