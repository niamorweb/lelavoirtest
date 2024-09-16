"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("token");

    setToken(tokenInLocalStorage);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full flex flex-col gap-5 ">
        <h1 className="text-4xl text-gray-700 font-bold mb-6 text-center">
          Bienvenue sur notre application !
        </h1>
        {token ? (
          <Link href="/signup" className=" mx-auto">
            Aller au dashboard
          </Link>
        ) : (
          <div className="flex flex-row justify-center items-center gap-5 h-full">
            <Link href="/signup" className="">
              S'inscrire
            </Link>
            <Link href="/login" className="">
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
