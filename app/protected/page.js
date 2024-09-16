"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("token");
    if (!tokenInLocalStorage) {
      router.push("/login");
    }
    const nameInLocalStorage = localStorage.getItem("name");
    setName(nameInLocalStorage);
    setToken(tokenInLocalStorage);
  }, []);

  return (
    token && (
      <div className="flex items-center justify-center my-32">
        <h2 className="text-2xl font-semibold ">
          Bienvenue {name} sur la page protégé, vous êtes connecté
        </h2>
      </div>
    )
  );
}
