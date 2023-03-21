import emptyCart from '/assets/empty-cart.jpg';
import fullCart from '/assets/full-cart.jpg';

import { Avatar } from '@mantine/core';
import { useModalStore, useUserStore } from '../../store';
import { shallow } from 'zustand/shallow';
import { useStyles } from './styles';

const IconCart = () => {
  const { classes } = useStyles();
  const { products } = useUserStore(({ cart: { products } }) => ({ products }), shallow);
  const { onShow } = useModalStore(({ onShow }) => ({ onShow }), shallow);
  return (
    <Avatar
      component='button'
      src={products?.length ? fullCart : emptyCart}
      alt='empty cart icon'
      size={40}
      className={classes.icon}
      onClick={() => onShow('drawerCart')}
    />
  );
};
export default IconCart;
