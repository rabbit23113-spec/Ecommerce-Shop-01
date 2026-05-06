"use client";

import { ProductDto } from "@/dto/product.dto";
import axios from "axios";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import cls from "./page.module.css";
import {
  Box,
  ChakraProvider,
  Container,
  defaultSystem,
  Stack,
} from "@chakra-ui/react";
import Product from "@/components/ui/Product/Product";
import Category from "@/components/ui/Category/Category";
import Loader from "@/components/ui/Loader/Loader";

export default function Home() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getProducts(): Promise<void> {
      const products: ProductDto[] = (
        await axios.get("http://localhost:3100/api/product")
      ).data;
      setProducts(products);
    }
    async function getCategories(): Promise<void> {
      const categoriesData = (
        await axios.get("http://localhost:3100/api/category")
      ).data;
      setCategories(categoriesData);
      console.log(categoriesData);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    getProducts();
    getCategories();
  }, []);
  function onClickCategoryHandler(event: MouseEvent<HTMLDivElement>): void {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const id = event.currentTarget.id;
    const productsWithSelectedCategory: ProductDto[] = products.filter(
      (product) => product.categoryId === id,
    );
    setSortedProducts(productsWithSelectedCategory);
    console.log(productsWithSelectedCategory);
  }
  return (
    <div className={cls.wrapper}>
      {
        <ChakraProvider value={defaultSystem}>
          <Stack>
            <Box
              bg={"#252525"}
              color={"white"}
              w={"breakpoint-2xl"}
              borderRadius={5}
              h={150}
              padding={15}
              fontWeight={"black"}
              fontSize={"2xl"}
            >
              Find, buy and enjoy!
            </Box>
          </Stack>
          <div className={cls.categories}>
            {categories.map((category) => (
              <Category
                onClick={onClickCategoryHandler}
                key={category.id}
                categoryId={category.id}
              />
            ))}
          </div>
          <div className={cls.products}>
            {!isLoading ? (
              sortedProducts.length <= 0 ? (
                products.map((product) => (
                  <Product key={product.id} {...product} />
                ))
              ) : (
                sortedProducts.map((product) => (
                  <Product key={product.id} {...product} />
                ))
              )
            ) : (
              <Loader />
            )}
          </div>
        </ChakraProvider>
      }
    </div>
  );
}
