import dynamic from "next/dynamic";

const OrderForm = dynamic(() => import("../../components/OrderForm"),{
  ssr: false,
});

export const NewOrderPage = () => {
  return <div>
    <OrderForm/>
  </div>
}

export default NewOrderPage;