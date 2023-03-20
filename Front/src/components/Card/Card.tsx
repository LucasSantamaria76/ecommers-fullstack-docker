import { Card, Image, Text, Badge, Button, Group, createStyles, Avatar, Flex } from '@mantine/core';
import { IconHeart, IconShoppingCartPlus, IconShoppingCartX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { useUserStore } from '../../store';
import { formatPrice } from '../../Utils/formatPrice';
import { limitString } from '../../Utils/limitString';
import { Product } from './../../types/products.d';
import { useStyles } from './styles';

type Props = Product;

const CardTemplate = (props: Props) => {
  const { id, discount, price, photos, title } = props;
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const { addProductToCart, removeToCart, favorites, products, toggleFavorite } = useUserStore(
    ({ addProductToCart, cart: { products }, removeToCart, profile: { favorites }, toggleFavorite }) => ({
      addProductToCart,
      favorites,
      products,
      removeToCart,
      toggleFavorite,
    }),
    shallow
  );

  const isProductInTheCart = products?.findIndex((el) => el.id === id) >= 0;

  const IconCart = isProductInTheCart ? IconShoppingCartX : IconShoppingCartPlus;

  return (
    <Card shadow='sm' padding='lg' radius='sm' withBorder className={classes.card}>
      <Card.Section
        withBorder
        onClick={() => navigate('/details', { state: { product: { ...props } } })}
        className={classes.image}
      >
        <Image src={photos[0].photo} height={200} alt={limitString(title, 20)} fit='contain' bg='#fff' />
      </Card.Section>

      <Card.Section p={5}>
        <Text weight={500} fz='xs' m={5}>
          {limitString(title, 70)}
        </Text>
        <Group position='apart' m={5} mt={15}>
          <Text weight={500} fz='xs'>
            Precio {formatPrice(price)}
          </Text>
          {discount && (
            <Badge color={'green'} variant='light' size='sm'>
              {discount} % off
            </Badge>
          )}
        </Group>
      </Card.Section>
      <Card.Section>
        <Flex justify='space-between' align='center' direction='row' wrap='nowrap' mb={5} mx={15}>
          <IconCart
            size='1.6rem'
            color={isProductInTheCart ? theme.colors.red[7] : theme.colors.cyan[7]}
            stroke={1}
            onClick={() => (isProductInTheCart ? removeToCart(id) : addProductToCart({ id, quantity: 1 }))}
            className={classes.fav}
          />
          <IconHeart
            size='1.6rem'
            color={theme.colors.red[6]}
            stroke={1}
            onClick={() => toggleFavorite(id)}
            className={classes.fav}
            fill={favorites?.includes(id) ? theme.colors.red[6] : 'none'}
          />
        </Flex>
      </Card.Section>
    </Card>
  );
};

export default CardTemplate;
