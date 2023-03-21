import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { limitString } from '../../Utils/limitString';
import { useStyles } from './styles';
import { ProductData, ProductPurchase, Thumbnails } from './';
import { useMediaQuery } from '@mantine/hooks';

const ProductDetail = () => {
  const [indexPhoto, setIndexPhoto] = useState(0);
  const matches = useMediaQuery('(max-width: 767px)');
  const { classes } = useStyles();
  const { state } = useLocation();
  const { id, description, stock, category, photos, ...restProduct } = state.product;

  return (
    <>
      <Container size={matches ? '100%' : '90%'} px={0}>
        <Link to='/home' className={classes.link}>
          Volver al listado
        </Link>
        <Card shadow='sm' radius='md' withBorder mt={5}>
          <Grid>
            <Grid.Col span={12} sm={2} lg={1}>
              <Thumbnails photos={photos} indexPhoto={indexPhoto} setIndexPhoto={setIndexPhoto} />
            </Grid.Col>
            <Grid.Col span={12} sm={10} md={6} lg={4}>
              <Center h={600} bg='primary'>
                <Image
                  src={photos[indexPhoto].photo}
                  alt={limitString(restProduct.title, 20)}
                  fit='scale-down'
                  className={classes.image}
                  height={600}
                  width='100%'
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={12} sm={6} md={4}>
              <ProductData {...restProduct} />
            </Grid.Col>
            <Grid.Col span={12} sm={6} lg={3}>
              <ProductPurchase {...{ id, stock }} />
            </Grid.Col>
            <Grid.Col span={12} md={6} lg={12}>
              <Stack m={10}>
                <Title order={4} color='cyan'>
                  Descripción
                </Title>
                <Text color='dimmed'>{description}</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </>
  );
};
export default ProductDetail;
