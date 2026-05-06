"use client"

import { Button, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Link from "next/link";
import cls from './Header.module.css';

const Header = () => {
  return (
    <header className={cls.header}>
      <ChakraProvider value={defaultSystem}>
        <h3>ECom</h3>
        <nav className={cls.nav}>
          <Link href={"/"}>Home</Link>
          <Link href={"orders"}>Orders</Link>
          <Link href={"cart"}>Cart</Link>
        </nav>
        <div className={cls.btns}>
          <Link href={"signin"}>
            <Button variant={"solid"}>Sign In</Button>
          </Link>
          <Link href={"signup"}>
            <Button variant={"outline"}>Sign Up</Button>
          </Link>
        </div>
      </ChakraProvider>
    </header>
  );
};

export default Header;
