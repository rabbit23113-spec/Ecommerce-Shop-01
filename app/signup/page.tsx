"use client";

import cls from "./page.module.css";
import {
  ChakraProvider,
  Field,
  Input,
  defaultSystem,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
const SignUpPage = () => {
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
      const tokens = (
        await axios.post("http://localhost:3100/api/users/create", form)
      ).data.tokens;
      await cookieStore.set("accessToken", tokens.accessToken);
      await cookieStore.set("refreshToken", tokens.refreshToken);
      router.replace("/");
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
              onChange={onChangeInputHandler}
              size={"md"}
              name="email"
              padding={15}
              placeholder="E-mail"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Enter your first name</Field.Label>
            <Input
              onChange={onChangeInputHandler}
              size={"md"}
              name="firstName"
              padding={15}
              placeholder="First name"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Enter your last name</Field.Label>
            <Input
              onChange={onChangeInputHandler}
              size={"md"}
              name="lastName"
              padding={15}
              placeholder="Last name"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Create a password</Field.Label>
            <Input
              onChange={onChangeInputHandler}
              size={"md"}
              name="password"
              padding={15}
              placeholder="Password"
            />
          </Field.Root>
          <Text>
            Already have an account? <Link href={"signin"}>Sign in</Link>
          </Text>
          <Button onClick={onClickButtonHandler} variant={"solid"}>
            Sign Up
          </Button>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default SignUpPage;
