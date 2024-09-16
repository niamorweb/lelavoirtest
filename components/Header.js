"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("token");
    setToken(tokenInLocalStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <header className="p-5 bg-blue-500 text-white w-full ">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Lelavoir test
        </Link>
        {token ? (
          <button onClick={handleLogout} className="font-medium">
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-5">
            <Link className="font-medium" href="/login">
              Login
            </Link>
            <Link
              className="bg-white rounded-md px-5 py-2 text-blue-500 font-medium"
              href="/signup"
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
