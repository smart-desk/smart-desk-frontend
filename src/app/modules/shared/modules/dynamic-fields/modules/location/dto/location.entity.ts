import { DynamicFieldsBaseEntity } from '../../../../../models/field/dynamic-fields-base.entity';

export class LocationEntity extends DynamicFieldsBaseEntity {
    title: string;
    lat: number;
    lng: number;
}
