import { Button } from "@/components/ui/button";
import { type User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { type Session } from "next-auth";
import Link from "next/link";

const Header = ({ session }: { session: Session }) => {
  return (
    <div className="flex w-full items-center justify-between p-4">
      <Link href="/" className="text-lg font-bold text-primary">
        Mora
      </Link>
      <div className="flex items-center gap-2">
        <span>{session.user.email}</span>
        <Button>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
