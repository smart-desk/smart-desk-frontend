import { Observable, of } from 'rxjs';
import { CreatorFieldTextarea } from '../../models/models.dto';

const creatorFieldTextFake = {
    id: '000',
    field_id: '001',
    label: 'Test Label',
    placeholder: 'Test Placeholder',
    required: true,
};

export class CreatorFieldTextareaServiceFake {
    getTextAreasByFieldID(fieldID: string): Observable<CreatorFieldTextarea[]> {
        return of([]);
    }

    getTextArea(id: string): Observable<CreatorFieldTextarea> {
        return of(creatorFieldTextFake);
    }

    createTextArea(textArea: Partial<CreatorFieldTextarea>): Observable<CreatorFieldTextarea> {
        return of(creatorFieldTextFake);
    }

    updateTextArea(id, textArea: CreatorFieldTextarea): Observable<CreatorFieldTextarea> {
        return of(creatorFieldTextFake);
    }

    deleteTextArea(id): Observable<unknown> {
        return of();
    }
}
