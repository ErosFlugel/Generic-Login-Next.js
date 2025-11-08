'use client';

import { useState } from 'react';
import { logout } from '../login/actions';
import { Flex, Stack, Button } from '@chakra-ui/react';

export default function Dashboard() {
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(!loggingOut);
    logout();
  }

  return (
    <div>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'#0A1931'} // Very dark blue background for the whole page
      >
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={6}
        >
          <Button
            color={'black'}
            _hover={{
              bg: 'gray.600',
            }}
            size='lg'
            disabled={loggingOut}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
          {/* <button onClick={() => logout()}>Logout</button> */}
        </Stack>
      </Flex>
    </div>
  );
}
