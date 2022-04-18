import { extendTheme } from '@chakra-ui/react';

export const myTheme = extendTheme({
  colors: {
    secondary: '#D3659D',
    highlight: '#9D64A2',
    warning: '#686095',
    alternative: '#40567A',
  },
  styles: {
    global: props => ({
      'html,body': {
        background:
          props.colorMode === 'dark'
            ? 'linear-gradient(45deg,#FF6C87,#FC7246 )'
            : 'linear-gradient(45deg,#2F4858,#40567A)',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        'new-color': props => ({
          bg: props.colorMode === 'dark' ? '#6F4758' : '#9BDEAC',
        }),
      },
    },
  },
});
