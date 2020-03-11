module.exports = {
  theme: {
    screens: {
      'md': 'var(--breakpoint-md)'
    },
    spacing: {
      '200': 'var(--step--2)',
      '300': 'var(--step--1)',
      '400': 'var(--step-0)',
      '500': 'var(--step-1)',
      '600': 'var(--step-2)',
      '700': 'var(--step-3)',
      '800': 'var(--step-4)',
      '900': 'var(--step-5)'
    },
    maxWidth: {
      'none': 'none',
      'long': 'var(--measure-long)',
      'short': 'var(--measure-short)',
      'compact': 'var(--measure-compact)',
    },
    fontSize: theme => theme('spacing'),
    leading: {
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
      grey: {
        100: 'var(--grey-100)',
        200: 'var(--grey-200)',
        300: 'var(--grey-300)',
        400: 'var(--grey-400)',
        500: 'var(--grey-500)',
        600: 'var(--grey-600)',
        700: 'var(--grey-700)',
        800: 'var(--grey-800)',
        900: 'var(--grey-900)',
      }
    },
    extend: {},
  },
  variants: {
    backgroundColor: [],
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
    'backgroundColor',
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
