import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import { formatPrice } from '../../Utils/formatPrice';

interface Props {
  title: string;
  discount: number;
  price: number;
  feature: string[];
}

const ProductData = ({ title, discount, price, feature }: Props) => {
  return (
    <Stack>
      <Title order={3}>{title}</Title>
      {discount > 0 && (
        <Group>
          <Text color='dimmed' style={{ textDecoration: 'line-through' }}>
            {formatPrice(price)}
          </Text>
          <Badge color={'green'} variant='light' size='lg'>
            {discount} % off
          </Badge>
        </Group>
      )}
      <Title order={3}>{formatPrice(price - price * (discount / 100))}</Title>
      <ul>
        <Title order={4} mb={2} color='cyan'>
          Características
        </Title>
        {feature?.length && feature.map(({ feature, id }: any) => <li key={id}>{feature}</li>)}
      </ul>
    </Stack>
  );
};

export default ProductData;
