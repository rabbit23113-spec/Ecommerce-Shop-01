"use client"

import cls from './page.module.css';
import { ChakraProvider, Field, Input, defaultSystem, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
const SignUpPage = () => {
    return ( 
        <div className={cls.wrapper}>
      <div className={cls.form}>
        <ChakraProvider value={defaultSystem}>
          <Field.Root>
            <Field.Label>Enter your e-mail</Field.Label>
            <Input size={"md"} name="email" padding={15} placeholder="E-mail" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Enter your first name</Field.Label>
            <Input size={"md"} name="firstName" padding={15} placeholder="First name" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Enter your last name</Field.Label>
            <Input size={"md"} name="lastName" padding={15} placeholder="Last name" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Create a password</Field.Label>
            <Input
              size={"md"}
              name="password"
              padding={15}
              placeholder="Password"
            />
          </Field.Root>
          <Text>
            Already have an account? <Link href={"signin"}>Sign in</Link>
          </Text>
          <Button variant={"solid"}>Sign Up</Button>
        </ChakraProvider>
      </div>
    </div>
     );
}
 
export default SignUpPage;