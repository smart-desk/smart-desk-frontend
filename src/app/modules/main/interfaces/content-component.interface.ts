import { UpdateUserDto } from '../../../services/user/models/update-user.dto';
import { ProfileFormEnum } from '../pages/profile/components/profile/profile-form.enum';

export interface ContentComponent {
    formType: ProfileFormEnum;
    value: UpdateUserDto;
}
