import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export const SinglePostPage = () => {
    const router = useRouter();

    const postId = router.query.postId as string;

    const { data, isLoading } = trpc.useQuery(['posts.single-post', {postId}]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!data) {
        return <Error statusCode={404}/>
    }

    return (
        <div>
            <h1>{data?.title}</h1>
            <h4>Product ID: {data?.id}</h4>
            <p>{data?.content}</p>
        </div>
    )
}

export default SinglePostPage;