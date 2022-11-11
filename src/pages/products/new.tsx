import dynamic from "next/dynamic";

const ProductForm = dynamic(() => import("../../components/ProductForm"),{
  ssr: false,
});

export const NewProductPage = () => {
  return <div>
    <ProductForm/>
  </div>
}

export default NewProductPage;