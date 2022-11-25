import React, { useState } from "react";
import { useQuery } from "react-query";
import { SimpleGrid, Box } from "@chakra-ui/layout";
import ItemBox from "./ItemBox";
import { trpc } from "../utils/trpc";
import Loading from "./Loading";

export interface ItemBoxProps {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: string;
  categoryCode: string;
}

export const HomeProducts: React.FC = () => {
  const { data, isLoading } = trpc.useQuery(["products.products"]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} my={10}>
        {data?.map((product) => (
          <ItemBox key={product.id} item={product} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default HomeProducts;
