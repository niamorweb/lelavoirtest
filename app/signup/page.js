// app/signup/page.js

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Inscription réussie !");
        router.push("/protected");
      } else {
        const errorData = await response.json();
        setMessage(`Erreur: ${errorData.msg || "Inscription échouée"}`);
      }
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="py-32">
      <div className="flex flex-col gap-5 max-w-[400px] bg-white rounded-lg p-6 mx-auto">
        <h1 className="text-3xl font-bold">Inscription</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Nom:</label>
            <input
              className="p-2 border-[1px] border-black/50 focus:outline-2 outline-black/60 rounded-sm"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email:</label>
            <input
              className="p-2 border-[1px] border-black/50 focus:outline-2 outline-black/60 rounded-sm"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Mot de passe:</label>
            <input
              className="p-2 border-[1px] border-black/50 focus:outline-2 outline-black/60 rounded-sm"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="text-white mt-3 bg-blue-500 rounded-sm px-5 py-2 font-medium"
            type="submit"
          >
            S'inscrire
          </button>
          <p>
            Vous avez déjà un compte ?
            <Link href="login" className="ml-1 text-blue-500">
              Connectez-vous
            </Link>
          </p>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
