import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors.cyan[3],

    '&:hover': {
      color: theme.colors.cyan[5],
    },
  },
}));
