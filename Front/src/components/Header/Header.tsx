import {
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMicrowave,
  IconDeviceTv,
  IconDeviceCctv,
  IconDeviceMobile,
  IconBrandDiscord,
  IconDeviceLaptop,
  IconChevronDown,
} from '@tabler/icons-react';
import { shallow } from 'zustand/shallow';
import { useModalStore } from '../../store';
import { useUserStore } from '../../store';
import UserMenu from '../UserMenu/UserMenu';
import { useStyles } from './styles';
import logo from '/assets/logo.png';

const mockdata = [
  {
    icon: IconDeviceLaptop,
    title: 'Computación',
    description: 'Notebook, tablet, monitores y más...',
  },
  {
    icon: IconDeviceTv,
    title: 'Tv, audio y video',
    description: 'SmartTv,equipos de audio, parlantes y más...',
  },
  {
    icon: IconDeviceCctv,
    title: 'Cámaras y Accesorios',
    description: 'Cámaras de fotos, de vigilancia y todos los accesorios',
  },
  {
    icon: IconBrandDiscord,
    title: 'Consolas y Videojuegos',
    description: 'Consolas, juegos, accesorios y más...',
  },
  {
    icon: IconDeviceMobile,
    title: 'Celulares y Teléfonos',
    description: 'Todos los teléfonos y accesorios',
  },
  {
    icon: IconMicrowave,
    title: 'Electrodomésticos',
    description: 'Todo los electrodomésticos y repuestos',
  },
];

export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const onShow = useModalStore((state) => state.onShow, shallow);
  const { logout, logged } = useUserStore(
    (state) => ({
      logout: state.logout,
      logged: state.logged,
    }),
    shallow
  );

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align='flex-start'>
        <ThemeIcon size={34} variant='default' radius='md'>
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size='sm' fw={500}>
            {item.title}
          </Text>
          <Text size='xs' color='dimmed'>
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box mb={10}>
      <Header height={60} px='md'>
        <Group position='apart' sx={{ height: '100%' }}>
          <Image maw={50} radius='md' src={logo} alt='logo' />
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <HoverCard width={600} position='bottom' radius='md' shadow='md' withinPortal>
              <HoverCard.Target>
                <a href='#' className={classes.link}>
                  <Center inline>
                    <Box component='span' mr={5}>
                      Categorias
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position='apart' px='md'>
                  <Text fw={500}>Categorias</Text>
                  <Anchor href='#' fz='xs'>
                    Ver todas
                  </Anchor>
                </Group>

                <Divider my='sm' mx='-md' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href='#' className={classes.link}>
              Ofertas
            </a>
            <a href='#' className={classes.link}>
              Contacto
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            {logged ? (
              <UserMenu />
            ) : (
              <Button variant='outline' onClick={() => onShow('logInUp')}>
                Iniciar Sesión
              </Button>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Navigation'
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx='-md'>
          <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component='span' mr={5}>
                Categorias
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href='#' className={classes.link}>
            Ofertas
          </a>
          <a href='#' className={classes.link}>
            Contacto
          </a>

          <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position='center' grow pb='xl' px='md'>
            <Button variant='outline' onClick={() => (logged ? logout() : onShow('logInUp'))}>
              {logged ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
