import { Observable, of } from 'rxjs';
import { Field } from '../../models/models.dto';

const fieldFake = {
    id: '000',
    section_id: '001',
    type: '',
    data: null,
};

export class FieldServiceFake {
    getFieldsBySectionID(sectionID: string): Observable<Field[]> {
        return of([]);
    }

    getField(id: string): Observable<Field> {
        return of(fieldFake);
    }

    createField(field: Partial<Field>): Observable<Field> {
        return of(fieldFake);
    }

    updateField(id, field: Field): Observable<Field> {
        return of(fieldFake);
    }

    deleteField(id): Observable<unknown> {
        return of();
    }
}
