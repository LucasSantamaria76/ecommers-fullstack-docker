import { Container, Grid, Loader } from '@mantine/core';
import { Card } from '..';
import { useProductsStore } from '../../store';
import { shallow } from 'zustand/shallow';
import { toast } from 'react-hot-toast';

interface Props {}

const ListProducts = (props: Props) => {
  const { error, products } = useProductsStore(
    (state) => ({
      products: state.products,
      error: state.error,
    }),
    shallow
  );

  return (
    <>
      <Container fluid m={0}>
        <Grid gutter={5} justify='center'>
          {error.length
            ? toast.error(error)
            : products.map((product) => (
                <Grid.Col key={product.id} span='content'>
                  <Card {...product} />
                </Grid.Col>
              ))}
        </Grid>
      </Container>
    </>
  );
};
export default ListProducts;
