import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../../shared/models/dto/user/user.entity';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
    @Input()
    user: User;
}
