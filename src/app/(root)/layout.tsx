import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header session={session} />
      <main className="h-full w-full flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
