import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { useLogin } from "@/app/auth/hooks/useLogin";
import { useSignup } from "@/app/auth/hooks/useSignup";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const navigate = useNavigate();
  const isSignIn = type === "sign-in";
  const {
    mutate: login,
    isPending: isLoginPending,
    error: loginError,
  } = useLogin();

  const {
    mutate: signup,
    isPending: isSignupPending,
    error: signupError,
  } = useSignup();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (isSignIn) {
      login(
        { email: data.email, password: data.password },
        {
          onSuccess: () => {
            toast.success("Signed in successfully.");
            navigate("/");
          },
          onError: (error) => {
            toast.error(error.message || "Login failed");
          },
        }
      );
    } else {
      signup(
        {
          name: data.name!,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully. Please sign in.");
            navigate("/login");
          },
          onError: (error) => {
            toast.error(error.message || "Signup failed");
          },
        }
      );
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <img src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">MockGenius</h2>
        </div>

        <h3>Practice mock interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button
              className="btn"
              type="submit"
              disabled={isLoginPending || isSignupPending}
            >
              {isSignIn ? "Sign In" : "Create an Account"}
              {(isLoginPending || isSignupPending) && "..."}
            </Button>

            {(loginError || signupError) && (
              <p className="text-red-500 text-sm">
                {loginError?.message || signupError?.message}
              </p>
            )}
          </form>
        </Form>

        <p className="text-center">
          {isSignIn
            ? "No account yet? Please contact Administrator."
            : "Have an account already?"}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
