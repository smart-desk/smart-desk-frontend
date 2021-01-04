export interface Filters {
    // keys are field IDs
    [key: string]: object | [];
}

export interface FilterObject<T> {
    // key is field ID, generic is type of filter DTO, e.g. RadioFilterDto
    [key: string]: T;
}

export class Filter<T> {
    constructor(private fieldId: string, private params?: T) {}

    setFilterParams(params: T): void {
        this.params = params;
    }

    getFilterObject(): FilterObject<T> {
        return { [this.fieldId]: this.params };
    }
}
