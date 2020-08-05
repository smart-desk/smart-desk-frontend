import { IconDefinition, IconModule } from '@ant-design/icons-angular';
import { ApartmentOutline, AppstoreOutline, ArrowLeftOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const icons: IconDefinition[] = [PlusOutline, ApartmentOutline, ArrowLeftOutline, AppstoreOutline];

export const UIComponentsForTests = [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forRoot(icons),
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzTypographyModule,
    NzButtonModule,
    NzSelectModule,
    NzListModule,
    NzPopconfirmModule,
    NzPageHeaderModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzDividerModule,
    NzAlertModule,
    NzMessageModule,
    NzTreeModule,
    IconModule,
];
