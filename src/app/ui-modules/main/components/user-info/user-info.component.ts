import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../../modules/user/models/user.entity';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
    @Input()
    user: User;
}
