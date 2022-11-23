import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import { Flex, VStack, HStack, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { TableContainer, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/table';
import { Select } from '@chakra-ui/select';
import { UpdateProductOrderInput } from '../../schema/product-order.schema';
import Loading from '../../components/Loading';
import NextLink from 'next/link';
import {Spacer} from '@chakra-ui/react';

type STATUS = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'DELIVERED';

const OrdersListingPage = () => {
  const { data, isLoading } = trpc.useQuery(['orders.all']);
  const {
    mutate,
    isLoading: isUpdating,
    error,
  } = trpc.useMutation('orders.update-status');
  const [selected, setSelected] = useState('');

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleOrderStatusList = (status: string) => {
    const statusList = ['PENDING', 'CONFIRMED', 'ACTIVE', 'DELIVERED'];
    if (statusList.includes(status)) {
      let itemToRemove = statusList.indexOf(status);
      statusList.splice(itemToRemove, 1);
      return statusList;
    }
    return statusList;
  };

  const handleUpdateStatus = async (values: UpdateProductOrderInput) => {
    mutate(values);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack mt={5}>
      <Flex justify="right" w="full" pr={20}>
        <NextLink href='/orders/new/'>
          <Button colorScheme={'blue'}>Nueva Orden</Button>
        </NextLink>
      </Flex>
      <Flex alignItems={'center'} textAlign={'center'}>
        <TableContainer>
          <Table
            backgroundColor='white'
            borderRadius='lg'
            marginTop={3}
            variant='striped'
            boxShadow='md'
          >
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
                    <Td>
                      <Select onChange={(e) => handleSelect(e)}>
                        {handleOrderStatusList(order.status).map((status) => {
                          return (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          );
                        })}
                      </Select>
                    </Td>
                    <Td>
                      <Button
                        colorScheme={'blue'}
                        disabled={isUpdating}
                        onClick={() =>
                          handleUpdateStatus({
                            orderId: order.id,
                            status: selected as STATUS,
                          })
                        }
                        variant="ghost"
                      >
                        Actualizar
                      </Button>
                    </Td>
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
