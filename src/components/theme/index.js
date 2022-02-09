import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import fonts from './fonts';

const textStyles = {
  title5Brand: {
    fontFamily: 'brand',
    fontSize: '5xl',
    fontWeight: 'normal',
  },
  title4Brand: {
    fontFamily: 'brand',
    fontSize: '4xl',
    fontWeight: 'normal',
  },
  title4Heavy: {
    fontFamily: 'base',
    fontSize: '4xl',
    fontWeight: 'bold',
  },
  title3Heavy: {
    fontFamily: 'base',
    fontSize: '3xl',
    fontWeight: 'bold',
  },
  title3: {
    fontFamily: 'base',
    fontSize: '3xl',
    fontWeight: 'normal',
  },
  title2Heavy: {
    fontFamily: 'base',
    fontSize: '2xl',
    fontWeight: 'bold',
  },
  title2: {
    fontFamily: 'base',
    fontSize: '2xl',
    fontWeight: 'normal',
  },
  title1Heavy: {
    fontFamily: 'base',
    fontSize: 'xl',
    fontWeight: 'bold',
  },
  title1: {
    fontFamily: 'base',
    fontSize: 'xl',
    fontWeight: 'normal',
  },
  body2Heavy: {
    fontFamily: 'base',
    fontSize: 'lg',
    fontWeight: 'bold',
  },
  body2: {
    fontFamily: 'base',
    fontSize: 'lg',
    fontWeight: 'normal',
  },
  body1Heavy: {
    fontFamily: 'base',
    fontSize: 'md',
    fontWeight: 'bold',
  },
  body1: {
    fontFamily: 'base',
    fontSize: 'md',
    fontWeight: 'normal',
  },
};

const styles = {
  global: {
    'html, body': {
      fontSize: 'md',
      color: 'txt.primary',
      lineHeight: 'normal',
      minHeight: '100vh',
      padding: '0',
      width: '100%',
    },
    '*, *::before, ::after': {
      borderColor: 'border.decorative',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    '.js-focus-visible :focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
};

const breakpoints = createBreakpoints({
  sm: '37.5em', // small 600px
  md: '56.25em', // medium 900px
  lg: '68.75em', // large 1100px
  xl: '87.5em', // x-large 1400px
});

const theme = extendTheme({
  breakpoints,
  styles,
  textStyles,
  colors: {
    txt: {
      brand: '#000',
      dark: '#555',
      inverted: '#fff',
      link: '#555',
      muted: '#757575',
      primary: '#333333',
      sale: '#f00',
    },
    bg: {
      brand: '#4A90E2',
      dark: '#333',
      darkOverlay: 'rgba(0, 0, 0, 0.6)',
      error: 'rgba(208, 2, 26, 0.1)',
      info: 'rgba(10, 34, 90, 0.1)',
      inverted: '#000',
      page: '#E5E5E5',
      light: '#F5F5F5',
      muted: '#757575',
      primary: '#fff',
      success: 'rgba(71, 132, 6, 0.1)',
      tinted: '#EBEBEB',
      warning: 'rgba(184, 138, 0, 0.1)',
    },
    btn: {
      brand: '#000',
      brandDisabled: 'rgba(204, 204, 204, 0.6)',
      brandHover: '#000',
      dark: '#000',
      darkDisabled: 'rgba(204, 204, 204, 0.6)',
      darkHover: '#000',
      light: '#fff',
      lightDisabled: 'rgba(204, 204, 204, 0.6)',
      lightHover: '#000',
    },
    icon: {
      brand: '#4A90E2',
      inverted: '#fff',
      muted: '#757575',
      primary: '#333333',
      dark: '#333333',
    },
    border: {
      active: '#000',
      brand: '#4A90E2',
      decorative: '#ccc',
      disabled: 'rgba(204, 204, 204, 0.6)',
      error: '#d0021a',
      inverted: '#fff',
      muted: '#757575',
      primary: '#333',
    },
    alert: {
      error: '#d0021a',
      success: '#478406',
      info: '#0a225a',
      warning: '#b88a00',
    },
    brand: '#4A90E2',
    focus: '#68a2f9',
  },
  // DSM use base and brand as tokens, including body and heading
  // to overwrite Chakra's defaults
  fonts: {
    body: 'AktivGrotesk, Helvetica, Arial, sans-serif',
    heading: 'AktivGrotesk, Helvetica, Arial, sans-serif',
    base: 'AktivGrotesk, Helvetica, Arial, sans-serif',
    brand: 'CaslonGraphique, serif',
  },
  fontSizes: {
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
  },
  fontWeights: {
    normal: 'normal',
    bold: 'bold',
  },
  lineHeights: {
    normal: 'normal',
    none: '1',
    tight: '1.4',
    loose: '1.9',
  },
  space: {
    px: '1px',
    0: '0',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
    5: '32px',
    6: '40px',
    7: '48px',
    8: '56px',
    9: '64px',
    10: '72px',
    11: '80px',
    12: '88px',
    13: '96px',
    14: '104px',
    15: '112px',
    16: '120px',
    17: '128px',
  },
  shadows: {
    primary: {
      drop: '0px 4px 10px rgba(0, 0, 0, 0.06)',
      left: '-4px 0px 10px rgba(0, 0, 0, 0.06)',
      top: '0px -4px 10px rgba(0, 0, 0, 0.06)',
      right: '4px 0px 10px rgba(0, 0, 0, 0.06)',
    },
    emphasized: {
      drop: '0px 4px 10px rgba(0, 0, 0, 0.12)',
      left: '-4px 0px 10px rgba(0, 0, 0, 0.12)',
      top: '0px -4px 10px rgba(0, 0, 0, 0.12)',
      right: '4px 0px 10px rgba(0, 0, 0, 0.12)',
    },
  },
});

export default theme;
