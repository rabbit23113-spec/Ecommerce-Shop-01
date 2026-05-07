"use client"

import { Button, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Link from "next/link";
import cls from './Header.module.css';
import UseAuth from "@/hooks/UseAuth";

const Header = () => {
  const { isAuth, user } = UseAuth();
  return (
    <header className={cls.header}>
      <ChakraProvider value={defaultSystem}>
        <h3>ECom</h3>
        <nav className={cls.nav}>
          <Link href={"/"}>Home</Link>
          <Link href={"orders"}>Orders</Link>
          <Link href={"cart"}>Cart</Link>
        </nav>
        {isAuth ? <Link href={'/profile'} className={cls.profileLink}>{user?.firstName} {user?.lastName}</Link> : <div className={cls.btns}>
          <Link href={"signin"}>
            <Button variant={"solid"}>Sign In</Button>
          </Link>
          <Link href={"signup"}>
            <Button variant={"outline"}>Sign Up</Button>
          </Link>
        </div>}
      </ChakraProvider>
    </header>
  );
};

export default Header;
