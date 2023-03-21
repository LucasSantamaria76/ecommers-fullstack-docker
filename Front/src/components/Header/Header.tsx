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
  Flex,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { shallow } from 'zustand/shallow';
import { useModalStore } from '../../store';
import { useUserStore } from '../../store';
import { IconCart, UserMenu } from '..';
import { useStyles } from './styles';
import logo from '/assets/logo.png';
import { categoryMenu } from './listCategoryMenu';

export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const onShow = useModalStore(({ onShow }) => onShow, shallow);
  const { logout, logged } = useUserStore(
    ({ logout, logged }) => ({
      logout,
      logged,
    }),
    shallow
  );

  const links = categoryMenu.map((item) => (
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
        <Flex justify='space-between' align='center'>
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
          <Group>
            {logged ? (
              <>
                {<IconCart />}
                <UserMenu />
              </>
            ) : (
              <Button variant='outline' onClick={() => onShow('logInUp')}>
                Iniciar Sesión
              </Button>
            )}
            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Flex>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='xs'
        position='right'
        /* padding='md' */
        title={
          <Group>
            <Image maw={30} radius='md' src={logo} alt='logo' />
            <Title order={4} color={theme.colors.cyan[4]}>
              My Market
            </Title>
          </Group>
        }
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
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
