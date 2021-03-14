import { User } from '../../../../shared/models/user/user.entity';
import { NzUploadFile } from 'ng-zorro-antd/upload';

export interface FormNameDataInterface {
    profile: Partial<User>;
    file: NzUploadFile[];
}
