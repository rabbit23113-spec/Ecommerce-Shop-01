"use client";

import {
  Button,
  ChakraProvider,
  defaultSystem,
  Field,
  Input,
  Text,
} from "@chakra-ui/react";
import cls from "./page.module.css";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.form}>
        <ChakraProvider value={defaultSystem}>
          <Field.Root>
            <Field.Label>Enter your e-mail</Field.Label>
            <Input size={"md"} name="email" padding={15} placeholder="E-mail" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Enter your password</Field.Label>
            <Input
              size={"md"}
              name="password"
              padding={15}
              placeholder="Password"
            />
          </Field.Root>
          <Text>
            Do not have an account? <Link href={"signup"}>Sign up</Link>
          </Text>
          <Button variant={"solid"}>Sign In</Button>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default SignInPage;
