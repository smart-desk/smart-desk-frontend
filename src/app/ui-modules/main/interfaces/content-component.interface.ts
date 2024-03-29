import { UpdateUserDto } from '../../../modules/user/models/update-user.dto';
import { ProfileFormEnum } from '../pages/profile/pages/profile/profile-form.enum';

export interface ContentComponent {
    formType: ProfileFormEnum;
    value: UpdateUserDto;
}
