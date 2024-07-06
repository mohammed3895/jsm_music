"use client";
import FormFieldItem from "./FormItem";
import { signupSchema } from "@/utils/validations/auth/signup-vaildation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type z } from "zod";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

const SignUpForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = api.user.createUser.useMutation();
  const handleSubmit = (values: z.infer<typeof signupSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast({
          title: "Account created",
          description: "Welcome to the club!",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormFieldItem label="Email" control={form.control} name="email">
          <Input type="email" placeholder="Ex: john@doe.com" />
        </FormFieldItem>

        <FormFieldItem label="Password" control={form.control} name="password">
          <Input type="password" placeholder="********" />
        </FormFieldItem>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
