import { fieldMetadataList, FieldTypes } from '../../models/field-metadata';
import { ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { FieldSettingsComponent as CreatorInputBaseDirective } from '../../../modules/admin/components/field-settings';
import { FieldFormComponent } from '../../components/field-form/field-form.component';

export const getCreatorFieldComponentResolver = (
    componentFactoryResolver: ComponentFactoryResolver,
    type: FieldTypes
): ComponentFactory<CreatorInputBaseDirective<unknown>> => {
    const targetFieldMetadata = Array.from(fieldMetadataList).find(fieldMetadata => fieldMetadata.type === type);
    return componentFactoryResolver.resolveComponentFactory(targetFieldMetadata.settingsComponent);
};

export const getFieldComponentResolver = (
    componentFactoryResolver: ComponentFactoryResolver,
    type: FieldTypes
): ComponentFactory<FieldFormComponent<unknown>> => {
    const targetFieldMetadata = Array.from(fieldMetadataList).find(fieldMetadata => fieldMetadata.type === type);
    return componentFactoryResolver.resolveComponentFactory(targetFieldMetadata.formComponent);
};
