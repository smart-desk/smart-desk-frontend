import { DynamicFieldsBaseEntity } from '../../../../../modules/field/models/dynamic-fields-base.entity';

export class LocationEntity extends DynamicFieldsBaseEntity {
    title: string;
    lat: number;
    lng: number;
}
