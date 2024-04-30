import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="mx-3 mt-3 flex justify-between">
      <Image src="/logo.png" alt="FWS Foods" width={150} height={30} />
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};
