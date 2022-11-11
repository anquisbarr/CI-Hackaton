import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Input } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import { CreateProductOrderInput } from "../schema/product-order.schema";

export const OrderForm = () => {
    const { handleSubmit, register } = useForm<CreateProductOrderInput>();
    const router = useRouter();
  
    const { mutate, error}  = trpc.useMutation(["orders.createOrder"])
  
    function onSubmit(values: CreateProductOrderInput) {
      mutate(values);
    }
  
    return (
      <>
        <Stack alignItems={"center"}>
          <Box textAlign="center" mt={2}>
            <Text fontSize={"2xl"} fontWeight="bold" textColor={"purple.500"}>
              Agregar un nuevo producto
            </Text>
          </Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Código de producto</FormLabel>
                <Input type="text" {...register(`productId`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Cantidad de producto</FormLabel>
                <Input type="text" {...register(`quantity`)} />
              </FormControl>
              <button>
                <Button colorScheme="purple" width="full" mt={3}>
                  Crear nuevo producto
                </Button>
              </button>
              <FormControl>
                <Text>
                  {error?.message}
                </Text>
              </FormControl>
            </form>
          </Box>
        </Stack>
      </>
    );
  };

export default OrderForm;