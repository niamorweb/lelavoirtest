"use server";

import { fakeUsers } from "@/data/fakeUsers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Lire le corps de la requête
    const { name, email, password } = await request.json();

    const userFound = fakeUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) return;

    const newUser = { name, email, password };
    fakeUsers.push(newUser);

    const exampleToken = "example_token";

    return NextResponse.json({ token: exampleToken });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the URL", message: error.message },
      { status: 500 }
    );
  }
}
