import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import ItemBox from '../../components/ItemBox';
import Loading from '../../components/Loading';
import { trpc } from '../../utils/trpc';

const OrderForm = dynamic(() => import('../../components/OrderForm'), {
  ssr: false,
});

export type Item = {
  id: string;
  count: number;
};

export const NewOrderPage = () => {
  const { data, isLoading } = trpc.useQuery(['products.products']);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  function handleSelect(selected: Item) {
    if (selectedItems.some((item) => item.id === selected.id)) {
      setSelectedItems([
        ...selectedItems.filter((item) => item.id !== selected.id),
      ]);
    } else {
      setSelectedItems([...selectedItems, selected]);
    }
  }

  const handleAdd = (id: string) => {
    const index = selectedItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      let newArr = [...selectedItems];
      newArr[index].count = newArr[index].count + 1;
      setSelectedItems([...newArr]);
    }
  };

  const handleSus = (id: string) => {
    const index = selectedItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      let newArr = [...selectedItems];
      let newCount = newArr[index].count - 1;
      let newObject = { ...newArr[index], count: newCount };
      newArr[index] = { ...newObject };

      if (newCount == 0) {
        setSelectedItems([...selectedItems.filter((item) => item.id !== id)]);
      } else {
        setSelectedItems([...newArr]);
      }
    }
  };

  React.useEffect(() => {
    console.log({ selectedItems }); // [{id: 123123.., count: 2}, {id: 234234234, count: 4}, ....]
  }, [selectedItems]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <form onSubmit={() => {}}>
      <Text fontSize={'2xl'} fontWeight='bold' textColor={'purple.800'} mt={8}>
        Seleccione los productos deseados...
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} my={10}>
        {data?.map((product) => (
          <ItemBox
            key={product.id}
            item={product}
            selected={selectedItems.some((item) => item.id === product.id)}
            handleSelection={handleSelect}
            handleAdd={handleAdd}
            handleSus={handleSus}
            redirect={false}
            count={selectedItems.find((item) => item.id === product.id)?.count}
          />
        ))}
      </SimpleGrid>
      <Flex w='full' justify='right' position='sticky' bottom={6}>
        <Button variant='solid' colorScheme='purple' size='lg' type='submit'>
          Finalizar Orden
        </Button>
      </Flex>
    </form>
  );
};

export default NewOrderPage;
