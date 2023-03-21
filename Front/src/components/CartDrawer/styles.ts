import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  title: {
    backgroundColor: theme.colors.cyan[0],
  },
  removeCart: {
    cursor: 'pointer',
    color: theme.colors.red[7],
    padding: 0,
    margin: 0,
  },
}));
