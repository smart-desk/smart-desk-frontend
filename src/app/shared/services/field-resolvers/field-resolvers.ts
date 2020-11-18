import { fieldMetadataList } from '../../models/field-metadata';
import { ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { FieldSettingsComponent as CreatorInputBaseDirective } from '../../../modules/admin/components/field-settings';
import { FieldType } from '../../models/dto/field.entity';

export const getCreatorFieldComponentResolver = (
    componentFactoryResolver: ComponentFactoryResolver,
    type: FieldType
): ComponentFactory<CreatorInputBaseDirective<unknown>> => {
    const targetFieldMetadata = Array.from(fieldMetadataList).find(fieldMetadata => fieldMetadata.type === type);
    return componentFactoryResolver.resolveComponentFactory(targetFieldMetadata.settingsComponent);
};
