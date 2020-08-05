import { Observable, of } from 'rxjs';
import { CreatorFieldInputText } from '../../models/models.dto';

const creatorFake = {
    id: '000',
    field_id: '001',
    label: 'Test creator',
    placeholder: '',
    required: false,
};

export class CreatorFieldInputTextServiceFake {
    getInputTextsByFieldID(fieldID: string): Observable<CreatorFieldInputText[]> {
        return of([]);
    }

    getInputText(id: string): Observable<CreatorFieldInputText> {
        return of(creatorFake);
    }

    createInputText(inputText: Partial<CreatorFieldInputText>): Observable<CreatorFieldInputText> {
        return of(creatorFake);
    }

    updateInputText(id, inputText: CreatorFieldInputText): Observable<CreatorFieldInputText> {
        return of(creatorFake);
    }

    deleteInputText(id): Observable<unknown> {
        return of();
    }
}
