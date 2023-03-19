import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  image: {
    backgroundColor: '#fff',
  },
  thumbnail: {
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  thumbnails: {
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.colors.cyan[1],
      borderRadius: '10px',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.blue[7],
    cursor: 'pointer',
  },
}));
