import { Badge, Button, Center, Group, Image, Title } from '@mantine/core';
import { IconShoppingCartX } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { useModalStore, useProductsStore, useUserStore } from '../../store';
import { formatPrice } from '../../Utils/formatPrice';
import { limitString } from '../../Utils/limitString';
import { useStyles } from './styles';

interface Props {
  id: string;
}
const RowProduct = ({ id }: Props) => {
  const { addProductToCart, cartProducts, removeToCart, subtractProductToCart } = useUserStore(
    ({ addProductToCart, cart, removeToCart, subtractProductToCart }) => ({
      addProductToCart,
      cartProducts: cart.products,
      removeToCart,
      subtractProductToCart,
    }),
    shallow
  );
  const { products } = useProductsStore(({ products }) => ({ products }));
  const onClose = useModalStore(({ onClose }) => onClose, shallow);
  const [product] = useState(products?.find((el) => el.id === id));
  const productInCart = cartProducts.find((el) => el.id === id);
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <tr>
      <td
        onDoubleClick={() => {
          onClose('drawerCart');
          navigate('/details', { state: { product: { ...product } } });
        }}
      >
        <Center>
          <Image width={50} height={50} fit='contain' src={product?.photos[0].photo} />
        </Center>
      </td>
      <td
        onDoubleClick={() => {
          onClose('drawerCart');
          navigate('/details', { state: { product: { ...product } } });
        }}
      >
        <Title order={6}>{limitString(product?.title, 35)}</Title>
      </td>
      <td>
        <Group spacing='xs' position='center'>
          <Button variant='white' size='xs' onClick={() => subtractProductToCart({ id, quantity: 1 })}>
            <Title order={2} align='center' color='red'>
              -
            </Title>
          </Button>
          <Title order={6} align='center'>
            {productInCart!.quantity}
          </Title>
          <Button variant='white' size='xs' onClick={() => addProductToCart({ id, quantity: 1 })}>
            <Title order={2} align='center' color='cyan'>
              +
            </Title>
          </Button>
        </Group>
      </td>
      <td>
        <Title order={6} align='right'>
          {formatPrice((product!.price - product!.price * (product!.discount / 100)) * productInCart!.quantity)}
        </Title>
      </td>
      <td>
        <Center className={classes.removeCart}>
          <IconShoppingCartX onClick={() => removeToCart(id)} />
        </Center>
      </td>
    </tr>
  );
};
export default RowProduct;
