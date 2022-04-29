import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { presetShort } from '@/index';

describe('size', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetShort(),
    ],
  });

  const autocomplete = createAutocomplete(generator);

  test('自动宽高, 屏幕宽高', async() => {
    const { css } = await generator.generate(
      ['auto', 'screen'].map(s => `size-${s}`).join(' '),
    );

    expect(
      postcssJs.objectify(postcss.parse(css)),
    ).toEqual({
      '.size-auto': { width: 'auto', height: 'auto' },
      '.size-screen': { width: '100vw', height: '100vh' },
    });
  });

  test('百分比宽高', async() => {
    const { css } = await generator.generate(
      ['1/2', '1/4', '1/10', 'full'].map(s => `size-${s}`).join(' '),
    );

    expect(
      postcssJs.objectify(postcss.parse(css)),
    ).toEqual({
      '.size-1\\/2': { width: '50%', height: '50%' },
      '.size-1\\/4': { width: '25%', height: '25%' },
      '.size-1\\/10': { width: '10%', height: '10%' },
      '.size-full': { width: '100%', height: '100%' },
    });
  });

  test('固定宽高', async() => {
    const { css } = await generator.generate(
      [
        '1', '2', '3', '666',
        'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',
      ].map(s => `size-${s}`).join(' '),
    );

    expect(
      postcssJs.objectify(postcss.parse(css)),
    ).toEqual({
      '.size-1': { width: '0.25rem', height: '0.25rem' },
      '.size-2': { width: '0.5rem', height: '0.5rem' },
      '.size-3': { width: '0.75rem', height: '0.75rem' },
      '.size-666': { width: '166.5rem', height: '166.5rem' },
      '.size-xs': { width: '20rem', height: '20rem' },
      '.size-sm': { width: '24rem', height: '24rem' },
      '.size-md': { width: '28rem', height: '28rem' },
      '.size-lg': { width: '32rem', height: '32rem' },
      '.size-xl': { width: '36rem', height: '36rem' },
      '.size-2xl': { width: '42rem', height: '42rem' },
      '.size-3xl': { width: '48rem', height: '48rem' },
      '.size-4xl': { width: '56rem', height: '56rem' },
      '.size-5xl': { width: '64rem', height: '64rem' },
      '.size-6xl': { width: '72rem', height: '72rem' },
      '.size-7xl': { width: '80rem', height: '80rem' },
    });
  });

  test('自定义宽高', async() => {
    const { css } = await generator.generate(
      ['1px', '1pt', '1pc', '1rem', '1em', '1%', '1vh', '1vw', '1in', '1cm', '1mm', '1ex', '1ch', '1vmin', '1vmax', '1rpx'].map(s => `size-[${s}]`).join(' '),
    );

    expect(
      postcssJs.objectify(postcss.parse(css)),
    ).toEqual({
      '.size-\\[1px\\]': { width: '1px', height: '1px' },
      '.size-\\[1pt\\]': { width: '1pt', height: '1pt' },
      '.size-\\[1pc\\]': { width: '1pc', height: '1pc' },
      '.size-\\[1rem\\]': { width: '1rem', height: '1rem' },
      '.size-\\[1em\\]': { width: '1em', height: '1em' },
      '.size-\\[1\\%\\]': { width: '1%', height: '1%' },
      '.size-\\[1vh\\]': { width: '1vh', height: '1vh' },
      '.size-\\[1vw\\]': { width: '1vw', height: '1vw' },
      '.size-\\[1in\\]': { width: '1in', height: '1in' },
      '.size-\\[1cm\\]': { width: '1cm', height: '1cm' },
      '.size-\\[1mm\\]': { width: '1mm', height: '1mm' },
      '.size-\\[1ex\\]': { width: '1ex', height: '1ex' },
      '.size-\\[1ch\\]': { width: '1ch', height: '1ch' },
      '.size-\\[1vmin\\]': { width: '1vmin', height: '1vmin' },
      '.size-\\[1vmax\\]': { width: '1vmax', height: '1vmax' },
      '.size-\\[1rpx\\]': { width: '1rpx', height: '1rpx' },
    });
  });

  test('autocomplete', async() => {
    expect(
      await autocomplete.suggest('size-'),
    ).toMatchSnapshot();
  });
});
