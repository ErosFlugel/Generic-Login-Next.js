'use client';
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputAddon,
  Button,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from './actions';

export default function LoginForm() {
  // Define colors based on the image's dark blue theme
  const cardBg = 'rgba(20, 40, 80, 0.9)'; // A dark, slightly desaturated blue
  const inputBg = 'rgba(25, 50, 100, 0.9)'; // A slightly lighter dark blue for the input fields
  const primaryBlue = 'blue.500'; // A bright blue for the button
  const textColor = 'white';

  // The undefined arg is the initial state of the "state" variable, useActionState we use for knowing the state while performing the form action
  const [state, loginAction] = useActionState(login, undefined);

  return (
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
        <Box
          rounded={'lg'}
          bg={cardBg}
          boxShadow={'xl'}
          p={8}
          minW={'350px'} // Set a minimum width to resemble the image's proportions
        >
          <Stack
            spacing={4}
            align={'center'}
            mb={6}
          >
            {/* User Icon */}
            <Box
              p={4}
              bg={inputBg}
              rounded={'full'}
              color={textColor}
              fontSize={'3xl'}
            >
              <FaUser />
            </Box>
            {/* Login Heading */}
            <Heading
              fontSize={'2xl'}
              color={textColor}
            >
              Inicio de Sesión
            </Heading>
          </Stack>
          <form action={loginAction}>
            <Stack spacing={4}>
              {state?.message && (
                <Box
                  bg='red.500'
                  color='white'
                  p={3}
                  rounded='md'
                  textAlign='center'
                  fontSize='sm'
                >
                  {state.message}
                </Box>
              )}
              {/* Email Field */}
              <Box>
                <Text
                  fontSize={'sm'}
                  fontWeight={'bold'}
                  color={textColor}
                  mb={1}
                >
                  Usuario
                </Text>
                <InputGroup>
                  <>
                    <InputAddon
                      pointerEvents='none'
                      bg='transparent'
                      border='none'
                      color={textColor}
                    >
                      <Box
                        as='span'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        height='100%'
                      >
                        <MdEmail color={textColor} />
                      </Box>
                    </InputAddon>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='jane.doe@example.com'
                      bg={inputBg}
                      color={textColor}
                      border={0}
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{ boxShadow: 'outline' }}
                    />
                  </>
                </InputGroup>
                {state?.errors?.email && (
                  <Text
                    color='red.400'
                    fontSize='sm'
                    mt={1}
                  >
                    {state.errors.email}
                  </Text>
                )}
              </Box>

              {/* Password Field */}
              <Box>
                <Text
                  fontSize={'sm'}
                  fontWeight={'bold'}
                  color={textColor}
                  mb={1}
                >
                  Contraseña
                </Text>
                <InputGroup>
                  <>
                    <InputAddon
                      pointerEvents='none'
                      bg='transparent'
                      border='none'
                      color={textColor}
                    >
                      <Box
                        as='span'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        height='100%'
                      >
                        <FaLock color={textColor} />
                      </Box>
                    </InputAddon>
                    <Input
                      id='password'
                      name='password'
                      type='password'
                      placeholder='••••••••'
                      bg={inputBg}
                      color={textColor}
                      border={0}
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{ boxShadow: 'outline' }}
                    />
                  </>
                </InputGroup>
                {state?.errors?.password && (
                  <Text
                    color='red.400'
                    fontSize='sm'
                    mt={1}
                  >
                    {state.errors.password}
                  </Text>
                )}
              </Box>

              {/* Forgot Password Link */}
              <Stack align={'flex-end'}>
                <Link
                  color={'gray.400'}
                  fontSize={'sm'}
                >
                  Olvidaste la contraseña?
                </Link>
              </Stack>

              {/* Login Button */}
              <SubmitButton bg={primaryBlue} />
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

function SubmitButton({ bg }) {
  const { pending } = useFormStatus();
  return (
    <Button
      bg={bg}
      color={'white'}
      _hover={{
        bg: 'blue.600',
      }}
      size='lg'
      disabled={pending}
      type='submit'
    >
      Iniciar Sesión
    </Button>
  );
}
