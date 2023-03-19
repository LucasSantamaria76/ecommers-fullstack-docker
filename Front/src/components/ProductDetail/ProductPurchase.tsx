import { Stack, Text, Group, Select, Button } from '@mantine/core';
import { IconArrowBack, IconShieldCheckFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useStyles } from './styles';

interface Props {
  id: string;
  stock: number;
}

const ProductPurchase = ({ id, stock }: Props) => {
  const [unit, setUnit] = useState<string | null>('1');
  const { classes } = useStyles();
  const data = Array(stock)
    .fill(0)
    .map((_, index) => ({ value: String(index + 1), label: `${index + 1} unidad${index ? 'es' : ''}` }));

  return (
    <Stack m={5}>
      <Text size='large' color='cyan'>
        Stock disponible
      </Text>
      <Group>
        <Text>Cantidad</Text>
        <Select data={data} w={140} value={unit} onChange={(value) => setUnit(value)} />
        <Text>{`(${stock} disponible${stock > 1 ? 's' : ''})`}</Text>
      </Group>
      <Button>Comprar ahora</Button>
      <Button variant='light'>Agregar al carrito</Button>
      <Group>
        <Text component='a' color='dimmed'>
          <IconArrowBack size={35} color='black' style={{ paddingTop: '15px' }} />
          <span className={classes.link}>Devolución gratis. </span>
          Tenés 30 días desde que lo recibís.
        </Text>
      </Group>
      <Group>
        <Text component='a' color='dimmed'>
          <IconShieldCheckFilled size={35} color='black' style={{ paddingTop: '15px' }} />
          <span className={classes.link}>Compra Protegida, </span>recibí el producto que esperabas o te devolvemos tu
          dinero.
        </Text>
      </Group>
    </Stack>
  );
};
export default ProductPurchase;
