import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";

import { trpc } from "../../utils/trpc";

export const CreatePostPage = () => {
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess({ id }) {
      router.push(`/posts/${id}/`);
    },
  });

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}

      <h1> Create Posts </h1>
      <input type="text" placeholder="Your product title" {...register(`title`)} />
      <br />
      <textarea placeholder="Your product description..." {...register(`content`)} />
      <br />
      <button>Create new post!</button>
    </form>
  );
};

export default CreatePostPage;
