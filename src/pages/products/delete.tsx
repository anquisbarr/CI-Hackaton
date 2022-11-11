import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { DeleteCategoryInput } from "../../schema/category.schema";
import { trpc } from "../../utils/trpc";

export const DeleteProductPage = () => {
  const { data } = trpc.useQuery(["users.me"]);

  const router = useRouter();
  const { handleSubmit, register } = useForm<DeleteCategoryInput>();
  const { mutate, error } = trpc.useMutation("products.delete", {
    onSuccess: () => {
      router.push(`/products/`);
    },
  });

  function onSubmit(values: DeleteCategoryInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registrar categoria</h1>
        <input
          type="text"
          placeholder="Ingrese el código de la categoría"
          {...register("productId")}
        />
        <br />
        <button type="submit">Registrar</button>
        <h3>{error && error.message}</h3>
      </form>
    </>
  );
};

export default DeleteProductPage;
