import { Avatar, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core';
import {
  IconChevronsDown,
  IconHeart,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconBasket,
} from '@tabler/icons-react';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useUserStore } from '../../store';
import { useStyles } from './styles';

const UserMenu = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();
  const { logout, profile } = useUserStore(
    (state) => ({
      logout: state.logout,
      profile: state.profile,
    }),
    shallow
  );

  return (
    <Menu
      width={260}
      position='bottom-end'
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group spacing={7}>
            <Avatar src={profile.avatar} alt={profile.firstName} radius='xl' size={40} />
            <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
              {`${profile.firstName} ${profile.lastName}`}
            </Text>
            <IconChevronsDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconHeart size='1.2rem' color={theme.colors.red[6]} stroke={1.5} />}>Favoritos</Menu.Item>
        <Menu.Item icon={<IconBasket size='1.2rem' color={theme.colors.yellow[6]} stroke={1.5} />}>Compras</Menu.Item>

        <Menu.Item icon={<IconSettings size='1.2rem' stroke={1.5} />}>Configuraciones de la cuenta</Menu.Item>
        <Menu.Item icon={<IconSwitchHorizontal size='1.2rem' stroke={1.5} />}>Cambiar cuenta</Menu.Item>
        <Menu.Item component='button' onClick={() => logout()} icon={<IconLogout size='1.2rem' stroke={1.5} />}>
          Cerrar Sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default UserMenu;
