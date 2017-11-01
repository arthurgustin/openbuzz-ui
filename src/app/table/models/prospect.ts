import { Email } from './email';
import { SocialMedia } from './social-media';
import {Assets} from './assets';

export interface Prospect {
  id: string;
  host: string;
  description: string;
  emails: Array <Email>;
  socialMedia: Array<SocialMedia>;
  assets: Assets;
  tags: Array<string>;
}
