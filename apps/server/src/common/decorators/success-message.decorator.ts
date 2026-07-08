import { SetMetadata } from '@nestjs/common';

import { SUCCESS_MESSAGE_KEY } from '@/common/constants/metadata-keys';

export const SuccessMessage = (message: string) => SetMetadata(SUCCESS_MESSAGE_KEY, message);
