import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type SigninSchema } from "@/utils/validations/auth/signin-validation";
import { type SignupSchema } from "@/utils/validations/auth/signup-vaildation";
import { type Control } from "react-hook-form";

const FormFieldItem = ({
  label,
  children,
  control,
  name,
}: {
  label: string;
  children: React.ReactNode;
  control: Control<SigninSchema | SignupSchema>;
  name: "email" | "password";
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-muted-foreground">
            {label}
          </FormLabel>
          <FormControl {...field}>{children}</FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormFieldItem;
