import { useState } from "react";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { useRouter } from "next/router";
import { Box, Stack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";

export const VerifyToken = ({ hash }: { hash: string }) => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <p>Verifying....</p>;
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");
  return <p>Redirecting</p>;
};

export const LoginForm = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation("users.request-otp", {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath });
  }

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <Stack alignItems="center" justifyContent={"center"} backgroundColor="white" borderRadius="md" p={8} boxShadow="md">
        <Box textAlign="center" mt={2}>
          <Text fontSize={"2xl"} fontWeight="bold" textColor={"purple.500"}>
            Sign In to Your Account
          </Text>
        </Box>
        <Box mt={2} textAlign="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </FormControl>

            <button>
              <Button colorScheme="purple" width="full" mt={8}>
                Sign In
              </Button>
            </button>

            <Box
              mt={2}
              textAlign="center"
              textStyle={"bold"}
              textColor={"pink.500"}
            >
              <Link href="/register">Register</Link>
            </Box>

            <Stack mt={4} textAlign="center">
              <Box>{error && <Text fontWeight='bold' textColor={'red.500'}>
                {error.message}
              </Text>} </Box>
              <Box>
                {success && (
                  <Text fontWeight='bold' textColor={"purple.400"}>
                    Check your email
                  </Text>
                )}
              </Box>
            </Stack>
          </form  >
        </Box>
      </Stack>
    </>
  );
};

export default LoginForm;
