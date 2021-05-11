import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionCreateDto } from '../../models/section/section.dto';
import { FieldEntity } from '../../models/field/field.entity';

@Injectable()
export class SectionService {
    constructor(private http: HttpClient) {}

    createSection(section: SectionCreateDto): Observable<FieldEntity> {
        return this.http.post<FieldEntity>(`/sections`, section);
    }

    deleteSection(id: string): Observable<unknown> {
        return this.http.delete<FieldEntity>(`/sections/${id}`);
    }
}
