"use client";

import { Form } from "@/components/ui/form";
import React from "react";
import { type z } from "zod";
import { useForm } from "react-hook-form";
import { signinSchema } from "@/utils/validations/auth/signin-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import FormFieldItem from "./FormItem";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

const SignInForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = api.user.login.useMutation();

  const handleSubmit = (values: z.infer<typeof signinSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast({
          title: "Signed in",
          description: "You have successfully signed in",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
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
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
