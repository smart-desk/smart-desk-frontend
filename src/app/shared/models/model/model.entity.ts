import { Section } from '../section/section.entity';

export class Model {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    sections: Section[];
}