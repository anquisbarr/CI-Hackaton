import React from "react";
import { Box, Badge, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import NextLink from "next/link";
import { ItemBoxProps } from "./HomeProducts";

type Props = {
  item: ItemBoxProps,
}

export const ItemBox: React.FC<Props> = ({item}) => {
      return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image src={item.image} alt={item.image} />
    
          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>
                New
              </Badge>
              <Box
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='xs'
                textTransform='uppercase'
                ml='2'
              >
                {item.stock} items disponibles
              </Box>
            </Box>
    
            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              noOfLines={1}
            >
              <NextLink href={`/products/${item.id}/`} passHref>
                {item.name}
              </NextLink>d
            </Box>
    
            <Box as="div">
              <Text>
                {item.price}
                <Text as="span" color="gray.600" fontSize="sm">
                  {" soles/unidad"}
                </Text>
              </Text>
              </Box>
          </Box>
        </Box>
      )
}

export default ItemBox;
