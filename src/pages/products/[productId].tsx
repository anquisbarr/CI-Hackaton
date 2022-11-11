import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Image } from "@chakra-ui/image";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import Loading from "../../components/Loading";

export const SingleProductPage = () => {
  const router = useRouter();

  const productId = router.query.productId as string;

  const { data, isLoading } = trpc.useQuery([
    "products.single-product",
    { productId },
  ]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!data) {
    return <Error statusCode={404}></Error>;
  }

  return (
    <>
      {" "}
      <Flex>
        <VStack>
          <HStack>
            <Box
              maxW="xl"
              overflow="hidden"
              mt={10}
              borderWidth="2px"
              borderRadius="lg"
            >
              <Image src={data.image} alt={data.image} />
            </Box>
            <Box alignSelf={"start"}>
              <Stack spacing={4} mt={10} ml={5}>
                <Text fontSize="2xl" fontWeight="bold">
                  {data.name}
                </Text>
                <HStack>
                  <Box
                    color="gray.600"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="sm"
                    textTransform="uppercase"
                    mr="4"
                    alignSelf="start"
                  >
                    {data.stock} items disponibles
                  </Box>
                  <Badge
                    maxW={"145px"}
                    borderRadius="full"
                    px="2"
                    colorScheme="purple"
                  >
                    <Text fontSize={"sm"} fontWeight={"medium"}>
                      Categoría: {data.categoryCode}
                    </Text>
                  </Badge>
                </HStack>

                <Text fontSize={"lg"}>{data.content}</Text>
                <Box justifyContent="end">
                  <HStack>
                    <Text
                      fontSize={"3xl"}
                      textColor="purple.500"
                      fontWeight={"bold"}
                    >
                      Precio:{" "}
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold">
                      {data.price} soles
                    </Text>
                  </HStack>
                </Box>
              </Stack>
            </Box>
          </HStack>
          <HStack>{/* TODO: Display ItemBox of the other products */}</HStack>
        </VStack>
      </Flex>
    </>
  );
};

export default SingleProductPage;
