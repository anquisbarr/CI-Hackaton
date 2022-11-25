import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { router } from "@trpc/server";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import ItemBox from "../../components/ItemBox";
import Loading from "../../components/Loading";
import {
  CreateOrderInput,
  CreateProductOrderInput,
} from "../../schema/product-order.schema";
import { trpc } from "../../utils/trpc";

export const NewOrderPage = () => {
  const { data, isLoading } = trpc.useQuery(["products.products"]);
  const [selectedItems, setSelectedItems] = React.useState<
    CreateProductOrderInput[]
  >([]);
  const { mutate, error, isLoading: orderCreateLoad } = trpc.useMutation("orders.create-order");
  const router = useRouter();
  
  function onSubmit(values: CreateOrderInput) {
    mutate(values);
    router.push("/orders");
  }

  function handleSelect(selected: CreateProductOrderInput) {
    if (selectedItems.some((item) => item.productId === selected.productId)) {
      setSelectedItems([
        ...selectedItems.filter(
          (item) => item.productId !== selected.productId
        ),
      ]);
    } else {
      setSelectedItems([...selectedItems, selected]);
    }
  }

  const handleAdd = (id: string) => {
    const index = selectedItems.findIndex((item) => item.productId === id);
    if (index !== -1) {
      let newArr = [...selectedItems];
      newArr[index].quantity = newArr[index].quantity + 1;
      setSelectedItems([...newArr]);
    }
  };

  const handleSus = (id: string) => {
    const index = selectedItems.findIndex((item) => item.productId === id);
    if (index !== -1) {
      let newArr = [...selectedItems];
      let newCount = Number(newArr[index].quantity) - 1;
      let newObject = { ...newArr[index], count: newCount };
      newArr[index] = { ...newObject };

      if (newCount == 0) {
        setSelectedItems([
          ...selectedItems.filter((item) => item.productId !== id),
        ]);
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
    <>
      <Text fontSize={"2xl"} fontWeight="bold" textColor={"purple.800"} mt={8}>
        Seleccione los productos deseados...
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} my={10}>
        {data?.map((product) => (
          <ItemBox
            key={product.id}
            item={product}
            selected={selectedItems.some(
              (item) => item.productId === product.id
            )}
            handleSelection={handleSelect}
            handleAdd={handleAdd}
            handleSus={handleSus}
            redirect={false}
            count={
              selectedItems.find((item) => item.productId === product.id)
                ?.quantity
            }
          />
        ))}
      </SimpleGrid>
      <Flex w="full" justify="right" position="sticky" bottom={6}>
        <Button variant="solid" colorScheme="purple" size="lg" type="submit" disabled={orderCreateLoad} onClick={()=>{
          onSubmit({
            productOrders: selectedItems
          })
        }}>
          Finalizar Orden
        </Button>
      </Flex>
    </>
  );
};

export default NewOrderPage;
