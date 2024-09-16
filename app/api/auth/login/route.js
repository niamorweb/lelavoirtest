"use server";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Lire le corps de la requête
    const { email, password } = await request.json();
    console.log("email ;;; ", email);
    console.log("password ;;; ", password);

    const user = fakeUsers.find(
      (user) => user.email === email && user.password === password
    );

    const exampleToken = "example_token";

    return NextResponse.json({ token: exampleToken, name: user.name });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the URL", message: error.message },
      { status: 500 }
    );
  }
}
