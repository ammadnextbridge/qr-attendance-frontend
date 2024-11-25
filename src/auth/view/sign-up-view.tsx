import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBoolean } from "@/hooks/use-boolean";
import { paths } from "@/routes/paths";
import { motion } from "framer-motion";
import { useCreateUser } from "@/services/user.service";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/routes/hooks";

//----------------------------------------------------------------
const signUpSchema = z.object({
  name: z.string().min(1, { message: "Full name is required!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

//----------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();
  const { toast } = useToast();
  const { createUser, isCreating } = useCreateUser();

  const password = useBoolean();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const methods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const onSuccess = () => {
    toast({
      title: "Success",
      description: "User created successfully",
    });
    router.push(paths.auth.signIn);
  };

  const onError = (error: Error) => {
    toast({
      title: "Error",
      description: error.message,
    });
  };

  const onSubmit = handleSubmit((values) => {
    const payload = { ...values, role: "user" };

    createUser(payload, { onSuccess, onError });
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          {/* Logo or Brand Image */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <User className="h-6 w-6 text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Get Started
            </h1>
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to={paths.auth.signIn}
                className="font-medium text-primary hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <Form {...methods}>
            <form onSubmit={onSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Enter your full name"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type={password.value ? "text" : "password"}
                            placeholder="6+ characters"
                            className="pl-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={password.onToggle}
                          >
                            {password.value ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  className="w-full h-11 text-base"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-muted-foreground"
          >
            By creating an account, you agree to our{" "}
            <Link
              to="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
