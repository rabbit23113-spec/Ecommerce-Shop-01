"use client"

import { ChakraProvider, defaultSystem, Text } from "@chakra-ui/react";
import cls from './Footer.module.css';

const Footer = () => {
    return ( 
        <footer className={cls.footer}>
            <ChakraProvider value={defaultSystem}>
                <Text>Ecom Copyright {new Date().getFullYear()}</Text>
                <Text>Find. Buy. Enjoy</Text>
                <Text>by raffinnaisse</Text>
            </ChakraProvider>
        </footer>
     );
}
 
export default Footer;