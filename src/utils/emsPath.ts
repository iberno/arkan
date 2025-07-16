// src/utils/esmPath.ts
import path from 'path';
import { fileURLToPath } from 'url';

export const getDirname = (metaUrl: string) =>
  path.dirname(fileURLToPath(metaUrl));
