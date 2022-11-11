import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CreateCategoryInput } from "../../schema/category.schema";
import { trpc } from "../../utils/trpc";

export const CreateCategoryPage = () => {
  const { data } = trpc.useQuery(["users.me"]);

  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateCategoryInput>();
  const { mutate, error } = trpc.useMutation("categories.create", {
    onSuccess: ({ id }) => {
      router.push(`/categories/${id}/`);
    },
  });

  function onSubmit(values: CreateCategoryInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registrar categoria</h1>
        <input
          type="text"
          placeholder="Ingrese el código de la categoría"
          {...register("code")}
        />
        
        <input
          type="text"
          placeholder="Ingrese el nombre de la categoria"
          {...register("name")}
        />
        
        <input
          type="text"
          placeholder="Ingrese el contenido o descripcion de la categoria"
          {...register("content")}
        />
        <br />
        <button type="submit">Registrar</button>
        <h3>{error && error.message}</h3>
      </form>
    </>
  );
};

export default CreateCategoryPage;
