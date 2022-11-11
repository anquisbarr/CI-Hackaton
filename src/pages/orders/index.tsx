import { trpc } from "../../utils/trpc";
import { Flex, VStack, HStack, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { TableContainer, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/table";
import NextLink from "next/link";

const OrdersListingPage = () => {
  const { data, isLoading } = trpc.useQuery(["orders.all"]);

  console.log(data);


  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <VStack mt={5}>
        <HStack>
            <Box ml={500}>
            <NextLink href='/orders/update'>
                <Button colorScheme={'purple'}>Actualizar orden</Button>
            </NextLink>
            </Box>
        </HStack>
    <Flex alignItems={"center"} textAlign={'center'}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <th>Código de Orden</th>
              <th>Código Usuario</th>
              <th>Estado</th>
              <th>Total </th>
            </Tr>
          </Thead>
          <Tbody textAlign={'center'}>
            {data?.map((order) => {
              return (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{order.userId}</Td>
                  <Td>{order.status}</Td>
                  <Td>{order.total} PEN</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>

    </VStack>
  );
};

export default OrdersListingPage;
