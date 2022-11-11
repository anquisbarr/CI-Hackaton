import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Input } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import { UpdateProductOrderInput } from "../schema/product-order.schema";
import { Select } from "@chakra-ui/select"

export const OrderForm = () => {
    const { handleSubmit, register } = useForm<UpdateProductOrderInput>();
    const router = useRouter();
  
    const { mutate, error}  = trpc.useMutation(["orders.update-status"])

    function onSubmit(values: UpdateProductOrderInput) {
      mutate(values);
    }
  
    return (
      <>
        <Stack alignItems={"center"}>
          <Box textAlign="center" mt={2}>
            <Text fontSize={"2xl"} fontWeight="bold" textColor={"purple.500"}>
              Agregar estado de una Orden
            </Text>
          </Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Código de orden</FormLabel>
                <Input type="text" {...register(`orderId`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select {...register(`status`)}>
                    <option value="CONFIRMED">Confirmado</option>
                    <option value="ACTIVE">Activo</option>
                    <option value="DELIVERED">Entregado</option>
                </Select>
              </FormControl>
              <button>
                <Button colorScheme="purple" width="full" mt={3}>
                  Actualizar estado
                </Button>
              </button>
            </form>
          </Box>
        </Stack>
      </>
    );
  };

export default OrderForm;