import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { UserButton } from "./UserButton";

interface HeaderProps {
  name?: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <>
      <Flex px="4" py="4" justify="space-around" borderBottom="1px" borderColor="purple.100">
        <Text as={"div"} fontSize="2xl" fontWeight={"bold"} cursor="pointer">
          <span role="img" aria-labelledby="speaker">
            📢
          </span>
          <span>
            <NextLink href="/">
              <Text as={"span"} color="purple.600" paddingLeft={"1"}>
                DigaMED
              </Text>
            </NextLink>
          </span>
        </Text>
        <Flex align="center" justify="space-between">
          <NextLink href="/products/">
            <Text as={"h1"} fontWeight="bold" color="purple.600" mr={4} cursor="pointer">
              Productos
            </Text>
          </NextLink>
          <NextLink href="/categories/">
            <Text
              as={"h1"}
              fontWeight="bold"
              color="purple.600"
              paddingLeft={"4"}
              mr={4}
              cursor="pointer"
            >
              Categorias
            </Text>
          </NextLink>
          <NextLink href="/orders/">
            <Text
              as={"h1"}
              fontWeight="bold"
              color="purple.600"
              paddingLeft={"4"}
              mr={4}
              cursor="pointer"
            >
              Ordenes
            </Text>
          </NextLink>
        </Flex>
        <Flex align="end">
          <UserButton name={props.name} email={props.email} />
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
