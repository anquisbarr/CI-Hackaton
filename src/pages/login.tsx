import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LoginForm"),{
  ssr: false,
});

export const LoginPage = () => {
  return <div>
    <LoginForm/>
  </div>
};

export default LoginPage;
