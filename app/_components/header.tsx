"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export const Header = () => {
  const { data, status } = useSession();

  const handleSignInClick = () => {
    signIn();
  };

  const handleSignOutClick = () => {
    signOut();
  };

  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FWS Foods"
            fill
            className="object-contain"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <span className="border-none bg-transparent">
            <MenuIcon />
          </span>
        </SheetTrigger>
        <SheetContent className="w-80">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" && data.user?.name ? (
            <div>
              <div className="flex justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user.image!} />
                    <AvatarFallback>
                      {data.user.name.split(" ")[0][0] +
                        data.user.name.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data.user.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data.user.email}
                    </span>
                  </div>
                </div>
                <Button size="icon" onClick={handleSignOutClick}>
                  <LogOutIcon size={20} />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá! Faça seu login</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal"
                >
                  <ScrollTextIcon size={16} />
                  <span className="block">Meus pedidos</span>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes favoritos</span>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 text-sm font-normal"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
