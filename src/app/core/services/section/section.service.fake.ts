import { Observable, of } from 'rxjs';
import { Section } from '../../models/models.dto';

const sectionFake = {
    id: '000',
    model_id: '001',
    fields: [],
};

export class SectionServiceFake {
    getSectionsByModelID(modelID: string): Observable<Section[]> {
        return of([]);
    }

    getSection(id: string): Observable<Section> {
        return of(sectionFake);
    }

    createSection(section: Partial<Section>): Observable<Section> {
        return of(sectionFake);
    }

    updateSection(id, section: Partial<Section>): Observable<Section> {
        return of(sectionFake);
    }

    deleteSection(id): Observable<unknown> {
        return of();
    }
}
