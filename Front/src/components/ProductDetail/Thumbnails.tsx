import { Box, Image, Paper, SimpleGrid, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Photo } from '../../types/products';
import { useStyles } from './styles';

interface Props {
  photos: Photo[];
  indexPhoto: number;
  setIndexPhoto: (index: number) => void;
}

const Thumbnails = ({ photos, indexPhoto, setIndexPhoto }: Props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const matches = useMediaQuery('(max-width: 767px)');

  return (
    <Paper h={matches ? 100 : 700} w={matches ? '100%' : '100px'} className={classes.thumbnails}>
      {photos?.map((photo: Photo) => (
        <Box
          m={10}
          h={70}
          w='70px'
          component='button'
          key={photo.id}
          className={classes.thumbnail}
          style={{
            border: photos[indexPhoto].id === photo.id ? `3px solid ${theme.colors.cyan[4]}` : '1px solid #000',
          }}
          onMouseEnter={() => {
            setIndexPhoto(photos?.findIndex((el: Photo) => el.id === photo.id));
          }}
        >
          <Image height={60} src={photo.photo} fit='contain' />
        </Box>
      ))}
    </Paper>
  );
};

export default Thumbnails;
