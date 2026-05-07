"use client";

import { BrandDto } from "@/dto/brand.dto";
import { CategoryDto } from "@/dto/category.dto";
import axios from "axios";
import { HTMLProps, useEffect, useState } from "react";
import cls from "./Product.module.css";
import {
  Button,
  ChakraProvider,
  defaultSystem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  imageUrl: string;
  reviewIds: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const Product = (props: ProductProps) => {
  const router = useRouter();
  const [brand, setBrand] = useState({
    name: "",
    imageUrl: "",
  });
  const [category, setCategory] = useState({
    name: "",
  });
  const { id, name, description, brandId, categoryId, imageUrl, price } = props;
  useEffect(() => {
    async function getBrandAndCategory(): Promise<void> {
      const brandData: BrandDto = (
        await axios.get(`http://localhost:3100/api/brand/${brandId}`)
      ).data;
      setBrand(brandData);
      const categoryData: CategoryDto = (
        await axios.get(`http://localhost:3100/api/category/${categoryId}`)
      ).data;
      setCategory(categoryData);
    }
    getBrandAndCategory();
  }, [brandId, categoryId]);
  return brand && category ? (
    <div onClick={() => router.push(`/product/${id}`)} className={cls.product}>
      <ChakraProvider value={defaultSystem}>
        <Image
          h={250}
          w={250}
          src={imageUrl}
          objectFit={"contain"}
          alt="product-image"
        />
        <div className={cls.title}>
          <Text fontSize={16}>{name}</Text>
          <Text fontSize={12} color={"gray"}>
            {description} #{category.name}
          </Text>
        </div>
        <div className={cls.brandInfo}>
          <Image
            h={50}
            w={50}
            src={brand.imageUrl ? brand.imageUrl : null}
            alt="brand-image"
          />
          <Text fontSize={12} color={"gray"}>
            {brand.name}
          </Text>
        </div>
        <div className={cls.price}>
          <Text fontSize={18}>{price} USD</Text>
          <Button>View</Button>
        </div>
      </ChakraProvider>
    </div>
  ) : null;
};

export default Product;
