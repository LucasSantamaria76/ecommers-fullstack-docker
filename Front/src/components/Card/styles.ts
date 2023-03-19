import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    width: '230px',
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;',
    },
  },
  image: {
    cursor: 'pointer',
  },
  fav: {
    cursor: 'pointer',
    '&:hover': {
      fill: '#ccc',
    },
  },
}));
