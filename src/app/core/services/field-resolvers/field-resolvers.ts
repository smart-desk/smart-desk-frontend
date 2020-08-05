import { fieldMetadataList, FieldTypes } from '../../models/field-metadata';
import { ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { InputBaseDirective as CreatorInputBaseDirective } from '../../../modules/admin/core/components/input-base';
import { FormInputBaseDirective } from '../../components/input-base';

export const getCreatorFieldComponentResolver = (
    componentFactoryResolver: ComponentFactoryResolver,
    type: FieldTypes
): ComponentFactory<CreatorInputBaseDirective<unknown>> => {
    const targetFieldMetadata = Array.from(fieldMetadataList).find(fieldMetadata => fieldMetadata.type === type);
    return componentFactoryResolver.resolveComponentFactory(targetFieldMetadata.creatorComponent);
};

export const getFieldComponentResolver = (
    componentFactoryResolver: ComponentFactoryResolver,
    type: FieldTypes
): ComponentFactory<FormInputBaseDirective<unknown>> => {
    const targetFieldMetadata = Array.from(fieldMetadataList).find(fieldMetadata => fieldMetadata.type === type);
    return componentFactoryResolver.resolveComponentFactory(targetFieldMetadata.component);
};
