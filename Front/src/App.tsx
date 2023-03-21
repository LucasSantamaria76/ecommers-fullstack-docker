import { useEffect, useState } from 'react';
import { AppShell, Navbar, Aside, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import 'dayjs/locale/es'; //
import dayjs from 'dayjs';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { CartDrawer, Footer, Header } from './components';
import { LogInUp } from './components/Modals';

dayjs.extend(isLeapYear); // use plugin
dayjs.locale('es'); // use locale
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000/commers/api/';

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <>
      <AppShell
        /*  navbarOffsetBreakpoint='xl'
        asideOffsetBreakpoint='xl'
        navbar={
          <Navbar p='md' hiddenBreakpoint='xl' hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Text>Application navbar</Text>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan='xl' styles={{ display: 'none' }}>
            <Aside p='md' hiddenBreakpoint='xl' width={{ sm: 200, lg: 300 }}>
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        } */
        footer={<Footer />}
        header={<Header />}
      >
        <Outlet />
      </AppShell>
      <LogInUp />
      <CartDrawer />
      <Toaster />
    </>
  );
};

export default App;
