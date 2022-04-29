import { type Preset } from 'unocss';
import { sizeRules } from '@/rules/size';

export function presetShort(): Preset {
  return {
    name: 'unocss-preset-short',
    rules: [
      // 同时定义宽高
      ...sizeRules,
    ],
  };
}
