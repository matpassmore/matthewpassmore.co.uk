module.exports = {
  theme: {
    screens: {
      'md': 'var(--breakpoint-md)'
    },
    spacing: {
      '0': '0',
      '100': 'var(--step--3)',
      '200': 'var(--step--2)',
      '300': 'var(--step--1)',
      '400': 'var(--step-0)',
      '500': 'var(--step-1)',
      '600': 'var(--step-2)',
      '700': 'var(--step-3)',
      '800': 'var(--step-4)',
      '900': 'var(--step-5)',
      '1000': 'calc(var(--step-5) * 2)'
    },
    margin: (theme, { negative }) => ({ auto: 'auto', ...theme('spacing'), }),
    maxWidth: {
      'none': 'none',
      'measure': 'var(--measure)',
      'long': 'var(--measure-long)',
      'short': 'var(--measure-short)',
      'compact': 'var(--measure-compact)',
    },
    fontFamily: {
      'sans': 'var(--sans-serif)',
      'serif': 'var(--serif)',
      'mono': 'var(--mono)'
    },
    fontSize: theme => theme('spacing'),
    fontWeight: {
      'normal': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700'
    },
    lineHeight: {
      'tight': 'var(--line-height-tight)',
      'mid': 'var(--line-height-mid)',
      'loose': 'var(--line-height-loose)'
    },
    colors: {
      transparent: 'transparent',
      black: 'var(--black)',
      white: 'var(--white)',
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)',
      tertiary: 'var(--tertiary-color)',
      cyan: 'var(--cyan)',
      hotpink: 'var(--hotpink)',
    },
    extend: {},
  },
  variants: {
    fontFamily: [],
    fontSize: [],
    fontStyle: [],
    fontWeight: [],
    lineHeight: [],
    margin: [],
    maxWidth: [],
    padding: [],
    textColor: [],
  },
  corePlugins: [    
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'lineHeight',
    'margin',
    'maxWidth',
    'padding',
    'textColor',
  ],
  plugins: [],
}
