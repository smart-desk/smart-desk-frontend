import { ProfileFormEnum } from '../modules/profile/components/profile/profile-form.enum';
import { UpdateUserDto } from '../../../services/user/models/update-user.dto';

export interface ContentComponent {
    formType: ProfileFormEnum;
    value: UpdateUserDto;
}
