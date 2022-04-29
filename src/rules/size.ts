import { type Rule } from 'unocss';
import { handler } from '@unocss/preset-mini/utils';
import { camelCase } from 'lodash-es';

type WidthProps = 'width' | 'maxWidth' | 'minWidth';
type HeightProps = 'height' | 'maxHeight' | 'minHeight';

/**
 * 同时定义宽高
 */
export const sizeRules: Rule[] = [[
  /^(min-|max-)?size-(.+)$/,
  ([, minmax, prop], { theme }) => {
    const widthStr = camelCase(`${minmax || ''}width`) as WidthProps;
    const heightStr = camelCase(`${minmax || ''}height`) as HeightProps;

    // @ts-expect-error ???
    const width = theme[widthStr]?.[prop];
    // @ts-expect-error ???
    const height = theme[heightStr]?.[prop];

    if (width != null && height != null) {
      return {
        [widthStr]: width,
        [heightStr]: height,
      };
    }

    const value = handler.bracket.cssvar.auto.fraction.rem(prop);

    return {
      [widthStr]: value,
      [heightStr]: value,
    };
  },
  {
    autocomplete: [
      'size-$width|height|maxWidth|maxHeight|minWidth|minHeight',
      '(max|min)-size-$width|height|maxWidth|maxHeight|minWidth|minHeight',
    ],
  },
]];
