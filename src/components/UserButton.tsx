import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/menu";
import { FaUserCircle } from "react-icons/fa";
import NextLink from "next/link";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";


interface UserButtonProps {
  name?: string | undefined;
  email?: string | undefined;
}

const LogOut: React.FC = () => {
    const { mutate } = trpc.useMutation("users.remove-otp");
    const router = useRouter();

    return (
        <MenuItem
        onClick={() => {
            mutate();
            router.reload();
        }}
        >
        Log Out
        </MenuItem>
    );
}

export const UserButton: React.FC<UserButtonProps> = (
  props: UserButtonProps
) => {
  if (props.name && props.email) {
    return (
      <Flex align="center">
        <Menu>
          <MenuButton
            as={Button}
            color="purple.500"
            leftIcon={<FaUserCircle />}
          >
            {props.name}
          </MenuButton>
          <MenuList>
            {/* <Text display='flex' textAlign={'center'} marginLeft={2} marginRight={2} fontWeight='bold' textColor='purple.300'>{props.email}</Text> */}
            <NextLink href="/profile">
              <MenuItem>Profile</MenuItem>
            </NextLink>
            <MenuDivider />
            <LogOut />
          </MenuList>
        </Menu>
      </Flex>
    );
  } else {
    return (
      <Flex align="center">
        <NextLink href="/login">
          <Button colorScheme="purple" variant="outline">
            Login
          </Button>
        </NextLink>
      </Flex>
    );
  }
};
