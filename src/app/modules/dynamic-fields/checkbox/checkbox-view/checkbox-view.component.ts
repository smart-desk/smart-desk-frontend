import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-view.component';
import { CheckboxEntity } from '../dto/checkbox.entity';
import { CheckboxParamsDto } from '../dto/checkbox-params.dto';

@Component({
    selector: 'app-checkbox-view',
    templateUrl: './checkbox-view.component.html',
    styleUrls: ['./checkbox-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxViewComponent extends AbstractFieldViewComponent<CheckboxEntity, CheckboxParamsDto> {}
