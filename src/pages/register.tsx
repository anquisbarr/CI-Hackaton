import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { useRouter } from "next/router";

export const RegisterPage = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();


  const { mutate, error } = trpc.useMutation("users.register-user", {
    onSuccess: () => {
        router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>

        <input type="text" placeholder="Name" {...register("name")} />
        <input
          typeof="email"
          placeholder="name@email.com"
          {...register("email")}
        />
        <input type="password" placeholder="Password" {...register("password")} />
        <br />
        <button type="submit">Register</button>
      </form>

      <Link href="/login">LogIn</Link>
    </>
  );
};

export default RegisterPage;
