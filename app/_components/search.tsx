"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (search.trim() !== "") router.push(`/restaurants/?search=${search}`);
    setSearch("");
  };
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
      />
      <Button size="icon" onClick={handleSearchSubmit}>
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};
