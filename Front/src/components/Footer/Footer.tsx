import { Container, Group, Anchor } from '@mantine/core';
import { useStyles } from './styles';

const links = [
  {
    link: '#',
    label: 'Contact',
  },
  {
    link: '#',
    label: 'Privacy',
  },
  {
    link: '#',
    label: 'Blog',
  },
  {
    link: '#',
    label: 'Careers',
  },
];

export default function FooterSimple() {
  const { classes } = useStyles();

  const items = links.map((link) => (
    <Anchor<'a'> color='dimmed' key={link.label} href={link.link} onClick={(event) => event.preventDefault()} size='sm'>
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
