'use client';

import { useState } from 'react';
import { logout } from '../login/actions';
import { Flex, Stack, Button, Box, Center } from '@chakra-ui/react';
import HtmlContentWrapper from '@/src/components/HtmlContentWrapper';

export default function Dashboard() {
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(!loggingOut);
    logout();
  }

  return (
    <>
      <Flex
        gap={4}
        direction={'column'}
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
        <Center>
          <Box>
            <HtmlContentWrapper basePath='/Juan/' />
          </Box>
        </Center>
      </Flex>
    </>
  );
}
