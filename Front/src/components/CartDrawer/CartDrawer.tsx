import { Drawer, Table, Title } from '@mantine/core';
import { useModalStore, useUserStore } from '../../store';
import { useMediaQuery } from '@mantine/hooks';
import RowProduct from './RowProduct';
import { formatPrice } from '../../Utils/formatPrice';
import { useStyles } from './styles';

const CartDrawer = () => {
  const { drawerCart, onClose } = useModalStore(({ drawerCart, onClose }) => ({ drawerCart, onClose }));
  const { products, total } = useUserStore(({ cart: { products, total } }) => ({ products, total }));
  const matches = useMediaQuery('(max-width: 800px)');
  const { classes } = useStyles();

  return (
    <Drawer.Root
      opened={drawerCart}
      onClose={() => onClose('drawerCart')}
      position='right'
      size={matches ? '100%' : 'xl'}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header mb={20}>
          <Drawer.Title fz={30} fw={700}>
            {products.length ? `Hay ${products.length} productos en el carrito` : 'No hay productos en el carrito'}
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          {products.length ? (
            <Table withBorder withColumnBorders highlightOnHover>
              <thead className={classes.title}>
                <tr>
                  <th>
                    <Title order={6} align='center'>
                      Imagen
                    </Title>
                  </th>
                  <th>
                    <Title order={6} align='center'>
                      Descripción
                    </Title>
                  </th>
                  <th>
                    <Title order={6} align='center'>
                      Cantidad
                    </Title>
                  </th>
                  <th>
                    <Title order={6} align='center'>
                      Precio
                    </Title>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products?.length && products.map((product) => <RowProduct key={product.id} id={product.id} />)}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th>
                    <Title order={5} align='center'>
                      Total
                    </Title>
                  </th>
                  <th colSpan={2}>
                    <Title order={4} align='right'>
                      {formatPrice(total)}
                    </Title>
                  </th>
                </tr>
              </tfoot>
            </Table>
          ) : null}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
export default CartDrawer;
