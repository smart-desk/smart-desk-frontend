export interface Filters {
    // keys are field IDs
    [key: string]: object | [];
}

export interface FilterObject<T> {
    // key is field ID, generic is type of filter DTO, e.g. RadioFilterDto
    [key: string]: T;
}

export class Filter<T> {
    constructor(private fieldId: string, public params: T) {}

    getFieldId(): string {
        return this.fieldId;
    }

    getFilterParams(): T {
        return this.params;
    }

    getFilterObject(): FilterObject<T> {
        return { [this.fieldId]: this.params };
    }
}
