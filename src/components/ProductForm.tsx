import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Input } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import { CreateProductInput } from "../schema/product.schema";

export const ProductForm = () => {
    const { handleSubmit, register } = useForm<CreateProductInput>();
    const router = useRouter();
  
    const { mutate, error } = trpc.useMutation(["products.create"], {
      onSuccess({ id }) {
        router.push(`/products/${id}/`);
      },
    });
  
    function onSubmit(values: CreateProductInput) {
      values.id = values.categoryCode.concat(values.code);
      values.price = parseFloat(values.price.toString());
      mutate(values);
    }
  
    return (
      <>
        <Stack alignItems={"center"} backgroundColor="white" pt={4} pb={8} borderRadius="md">
          <Box textAlign="center" mt={2} backgroundColor="white">
            <Text fontSize={"2xl"} fontWeight="bold" textColor={"purple.500"}>
              Agregar un nuevo producto
            </Text>
          </Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Nombre del producto</FormLabel>
                <Input type="text" {...register(`name`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Código de producto</FormLabel>
                <Input type="text" {...register(`code`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Precio del producto</FormLabel>
                <Input type="number" {...register(`price`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Cantidad de producto</FormLabel>
                <Input type="number" {...register(`stock`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Imagen del producto</FormLabel>
                <Input type="url" {...register(`image`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Descripción del producto</FormLabel>
                <Input type="text" {...register(`content`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Categoría del producto</FormLabel>
                <Input type="text" {...register(`categoryCode`)} />
              </FormControl>
              <button>
                <Button colorScheme="purple" width="full" mt={3}>
                  Crear nuevo producto
                </Button>
              </button>
            </form>
          </Box>
        </Stack>
      </>
    );
  };

export default ProductForm;