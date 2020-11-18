import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../../models/dto/section.entity';
import { SectionCreateDto } from '../../models/dto/section.dto';

@Injectable()
export class SectionService {
    constructor(private http: HttpClient) {}

    createSection(section: SectionCreateDto): Observable<Section> {
        return this.http.post<Section>(`/sections`, section);
    }

    deleteSection(id: string): Observable<unknown> {
        return this.http.delete<Section>(`/sections/${id}`);
    }
}
