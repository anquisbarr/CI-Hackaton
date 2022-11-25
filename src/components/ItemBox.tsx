import React from 'react';
import { Box, Badge, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import NextLink from 'next/link';
import { ItemBoxProps } from './HomeProducts';
import { HStack, StackDivider } from '@chakra-ui/react';
import { CreateProductOrderInput } from '../schema/product-order.schema';

type Props = {
  item: ItemBoxProps;
  selected?: boolean;
  handleSelection?: (item: CreateProductOrderInput) => void;
  handleAdd?: (id: string) => void;
  handleSus?: (id: string) => void;
  redirect?: boolean;
  count?: number;
};

export const ItemBox: React.FC<Props> = ({
  item,
  selected = false,
  handleSelection = () => {},
  handleAdd = () => {},
  handleSus = () => {},
  redirect = true,
  count = 0,
}) => {
  return (
    <Box
      maxW='sm'
      borderWidth={selected ? '4px' : '1px'}
      borderRadius='lg'
      overflow='hidden'
      backgroundColor='#ffffff'
      boxShadow='md'
      borderColor={selected ? 'purple.500' : 'default'}
      onClick={() => handleSelection({ quantity: 1,  productId: item.id})}
      position='relative'
    >
      {selected && (
        <HStack
          borderRadius='xl'
          divider={<StackDivider borderColor='gray.200' />}
          position='absolute'
          backgroundColor='purple'
          textColor='white'
          px={2}
          top={2}
          right={2}
          cursor='pointer'
          zIndex='modal'
        >
          <div
            onClick={(ev) => {
              handleSus(item.id);
              ev.stopPropagation();
            }}
          >
            -
          </div>
          <div onClick={(ev) => ev.stopPropagation()}>{count}</div>
          <div
            onClick={(ev) => {
              handleAdd(item.id);
              ev.stopPropagation();
            }}
          >
            +
          </div>
        </HStack>
      )}
      <Image src={item.image} alt={item.image} />
      <hr />
      <Box p='6' backgroundColor='#ffffff'>
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
          {redirect ? (
            <NextLink href={`/products/${item.id}/`} passHref>
              {item.name}
            </NextLink>
          ) : (
            item.name
          )}
        </Box>

        <Box as='div'>
          <Text>
            {item.price}
            <Text as='span' color='gray.600' fontSize='sm'>
              {' soles/unidad'}
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemBox;
