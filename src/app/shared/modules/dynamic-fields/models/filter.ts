export interface Filters {
    [key: string]: object | [];
}

export interface FilterObject<T> {
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
