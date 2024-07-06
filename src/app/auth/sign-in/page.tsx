import SignInForm from "@/components/shared/forms/SignInForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full">
        <div className="fliter h-full w-full bg-gradient-to-b from-transparent to-primary blur-[200px]" />
      </div>
      <Card className="relative z-20 flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-4 text-left shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Sign In</h1>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
