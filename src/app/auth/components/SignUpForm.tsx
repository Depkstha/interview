import AuthForm from "@/components/AuthForm";
import GuestLayout from "../layouts/GuestLayout";

const SignUpForm = () => {
  return (
    <GuestLayout>
      <AuthForm type="sign-up" />
    </GuestLayout>
  );
};

export default SignUpForm;
