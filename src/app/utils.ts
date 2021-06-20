import { InjectionToken, Provider, Type } from '@angular/core';
import { DynamicFieldsMap } from './ui-modules/dynamic-fields/dynamic-fields.map';
import { AbstractFieldService } from './ui-modules/dynamic-fields/models/abstract-field.service';
import { FieldType } from './modules/field/models/field.entity';
import { Category } from './modules/category/models/category.entity';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import arrayToTree from 'array-to-tree';

export function createDynamicFieldProvider(type: FieldType, useClass: Type<AbstractFieldService>): Provider {
    DynamicFieldsMap.set(type, new InjectionToken<AbstractFieldService>(type));

    return { provide: DynamicFieldsMap.get(type), useClass };
}

export function createNode(category: Category): NzTreeNode {
    return new NzTreeNode({
        title: category.name,
        key: category.id,
        selectable: false,
        expanded: true,
        category,
    });
}

export function transformCategoryArrayToNZTree(categories: Category[]): NzTreeNode[] {
    const createNodesTree = (rootCats: any[], childCats: any[]): NzTreeNode[] => {
        return rootCats.map(cat => {
            cat.children = childCats.filter(category => category.parentId === cat.id);
            const node = createNode(cat);

            if (cat.children.length) {
                node.addChildren(createNodesTree(cat.children, childCats));
            }
            return node;
        });
    };
    const rootCategories = categories.filter(cat => cat.parentId === null);
    const childCategories = categories.filter(cat => cat.parentId !== null);
    return createNodesTree(arrayToTree(rootCategories), arrayToTree(childCategories));
}

export function transformCategoryArrayToNZCascade(categories: Category[]): NzCascaderOption[] {
    const createCascadeOption = (category: any): NzCascaderOption => {
        return {
            label: category.name,
            value: category.id,
            children: category.children,
            isLeaf: category.isLeaf,
        };
    };

    const createCascadesTree = (rootCats: any[], childCats: any[]): NzCascaderOption[] => {
        return rootCats.map(cat => {
            cat.children = childCats.filter(category => category.parentId === cat.id);
            if (cat.children.length) {
                cat.children = createCascadesTree(cat.children, childCats);
            }
            cat.isLeaf = !cat.children.length;
            return createCascadeOption(cat);
        });
    };
    const rootCategories = categories.filter(cat => cat.parentId === null);
    const childCategories = categories.filter(cat => cat.parentId !== null);
    return createCascadesTree(arrayToTree(rootCategories), arrayToTree(childCategories));
}
