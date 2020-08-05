import { Observable, of } from 'rxjs';
import { CreatorFieldText } from '../../models/models.dto';

const creatorFieldTextFake = {
    id: '000',
    field_id: '001',
    label: 'Test Label',
    placeholder: 'Test Placeholder',
    required: true,
};

export class CreatorFieldTextareaServiceFake {
    getTextAreasByFieldID(fieldID: string): Observable<CreatorFieldText[]> {
        return of([]);
    }

    getTextArea(id: string): Observable<CreatorFieldText> {
        return of(creatorFieldTextFake);
    }

    createTextArea(textArea: Partial<CreatorFieldText>): Observable<CreatorFieldText> {
        return of(creatorFieldTextFake);
    }

    updateTextArea(id, textArea: CreatorFieldText): Observable<CreatorFieldText> {
        return of(creatorFieldTextFake);
    }

    deleteTextArea(id): Observable<unknown> {
        return of();
    }
}
