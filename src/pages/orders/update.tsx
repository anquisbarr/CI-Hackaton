import dynamic from "next/dynamic";

const OrderUpdateForm = dynamic(() => import("../../components/OrderUpdateForm"),{
  ssr: false,
});

export const NewOrderPage = () => {
  return <div>
    <OrderUpdateForm/>
  </div>
}

export default NewOrderPage;