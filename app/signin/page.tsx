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
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignInPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function onChangeInputHandler(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  async function onClickButtonHandler(): Promise<void> {
    try {
      const tokens = (await axios.post('http://localhost:3100/api/users/validate', form)).data.tokens;
    await cookieStore.set('accessToken', tokens.accessToken);
    await cookieStore.set('refreshToken', tokens.refreshToken);
    router.replace('/');
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className={cls.wrapper}>
      <div className={cls.form}>
        <ChakraProvider value={defaultSystem}>
          <Field.Root>
            <Field.Label>Enter your e-mail</Field.Label>
            <Input
            onChange={onChangeInputHandler} size={"md"} name="email" padding={15} placeholder="E-mail" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Enter your password</Field.Label>
            <Input
            onChange={onChangeInputHandler}
              size={"md"}
              name="password"
              padding={15}
              placeholder="Password"
            />
          </Field.Root>
          <Text>
            Do not have an account? <Link href={"signup"}>Sign up</Link>
          </Text>
          <Button onClick={onClickButtonHandler} variant={"solid"}>Sign In</Button>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default SignInPage;
