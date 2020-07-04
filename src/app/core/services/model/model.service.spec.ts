import { of } from 'rxjs';
import { ModelService } from './model.service';
import { Model, ModelExtended } from '../../models/models.dto';

// todo replace with HttpClientTestingModule
// https://angular.io/api/common/http/testing/HttpClientTestingModule
// https://angular.io/guide/http#testing-http-requests
let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
};

describe('ModelService', () => {
    let service: ModelService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        service = new ModelService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all models', () => {
        const expectedModels: Model[] = [
            { id: '1', name: 'A' },
            { id: '2', name: 'B' },
        ];

        httpClientSpy.get.and.returnValue(of(expectedModels));

        service.getModels().subscribe(models => expect(models).toEqual(expectedModels, 'expected models'), fail);
    });

    it('should get extended model', () => {
        const expectedModel: ModelExtended = {
            id: '1',
            name: 'Test',
            sections: [
                {
                    id: '1',
                    model_id: '1',
                    fields: [
                        {
                            id: '1',
                            type: 'input_text',
                            section_id: '1',
                        },
                        {
                            id: '2',
                            type: 'text',
                            section_id: '1',
                        },
                    ],
                },
            ],
        };

        httpClientSpy.get.and.returnValue(of(expectedModel));

        service.getModel('1').subscribe(models => expect(models).toEqual(expectedModel, 'expected model'), fail);
    });
});
