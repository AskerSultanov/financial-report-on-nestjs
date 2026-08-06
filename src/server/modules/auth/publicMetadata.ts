import { SetMetadata } from '@nestjs/common';

export var IS_PUBLIC_KEY = process.env.SECRET_KEY;
export var Public = () => SetMetadata(IS_PUBLIC_KEY, true);
