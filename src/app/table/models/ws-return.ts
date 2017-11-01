import { Prospect } from './prospect';

export interface WSReturn {
  prospects: Array<Prospect>;
  error: boolean;
}
