import AuthForm from "@/components/AuthForm";
import GuestLayout from "../layouts/GuestLayout";

const LogInForm = () => {
  return (
    <GuestLayout>
      <AuthForm type="sign-in" />
    </GuestLayout>
  );
};

export default LogInForm;
