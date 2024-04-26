import { z } from 'zod';
import { Stack, HStack, Link, Text } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { FormProps, Form } from 'components/Form';
import LabeledTextField from 'components/LabeledTextField';
import LabeledCheckboxField from 'components/LabeledCheckboxField';

export function LoginForm<S extends z.ZodObject<any, any>>(
  props: FormProps<S>,
) {
  return (
    <>
      <Form<S>
        submitText="Login"
        submitProps={{
          colorScheme: 'orange',
          w: '200px',
          h: '50px',
          margin: ' 21px auto 0 auto',
          fontSize: '1rem',
          fontWeight: 700,
        }}
        {...props}
      >
        <Stack>
          <LabeledTextField
            name="email"
            label="Username"
            autoComplete="on"
            isRequired={true}
          />
          <LabeledTextField
            name="password"
            label="Password"
            type="password"
            isRequired={true}
          />
          <HStack>
            <LabeledCheckboxField name="remember" label="Remember me" />
            <NextLink legacyBehavior href="/reset-password" passHref>
              <Link
                color={'orange'}
                w={'200px'}
                textAlign={'right'}
                display={'block'}
              >
                Forgot Password
              </Link>
            </NextLink>
          </HStack>
        </Stack>
      </Form>
      <Text w={'100%'} textAlign="center" mt={3} fontWeight={300}>
        You don’t have an account?&nbsp;
        <NextLink legacyBehavior href="/registration" passHref>
          <Link fontWeight={700} color={'orange.500'}>
            Sign up
          </Link>
        </NextLink>
      </Text>
    </>
  );
}
