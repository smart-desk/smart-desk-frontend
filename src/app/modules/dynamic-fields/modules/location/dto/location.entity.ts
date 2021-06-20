import { DynamicFieldsBaseEntity } from '../../../../../services/field/models/dynamic-fields-base.entity';

export class LocationEntity extends DynamicFieldsBaseEntity {
    title: string;
    lat: number;
    lng: number;
}
