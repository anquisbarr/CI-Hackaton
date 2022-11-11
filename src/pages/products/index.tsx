import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Box, Flex } from "@chakra-ui/layout";
import Loading from "../../components/Loading";
import { trpc } from "../../utils/trpc";
import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

export const ProductsList = () => {
  const { data, isLoading } = trpc.useQuery(["products.products"]);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <VStack mt={5}>
        <HStack>
          <Box ml={500}>
            <NextLink href='/products/new/'>
              <Button colorScheme={'blue'}>Agregar productos</Button>
            </NextLink>
          </Box>
          <Box>
            <NextLink href='/products/edit/'>
                <Button colorScheme={'blue'}>Editar productos</Button>
            </NextLink>
          </Box>
        </HStack>
        <Flex>
          <Table>
            <Thead>
              <Th>Código</Th>
              <Th>Nombre</Th>
              <Th>Stock</Th>
              <Th>Precio (Soles)</Th>
              <Th>Categoría</Th>
            </Thead>
            <Tbody>
              {data?.map((product) => {
                return (
                  <Tr key={product.id}>
                    <Td>{product.code}</Td>
                    <Td>{product.name}</Td>
                    <Td>{product.stock}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.categoryCode}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
      </VStack>
    </>
  );
};

export default ProductsList;
