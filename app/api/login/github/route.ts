import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { createUser, selectUserByEmail } from "../loginModel";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Código no proporcionado" }, { status: 400 });
    }

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return NextResponse.json({ error: "Token de acceso no recibido" }, { status: 400 });
    }

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;

    const payload = {
      email: user.email,
      name: user.name,
      given_name: user.name?.split(" ")[0] || "", 
      family_name: user.name?.split(" ")[1] || "",
      picture: user.avatar_url,
    };

    const existingUser = await selectUserByEmail(user.email);

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5h" });

      return NextResponse.json({
        userIsRegister: true,
        token: jwtToken,
        ...payload,
        ...existingUser[0],
      });
    }

    const success = await createUser(user.email, user.name, user.name?.split(" ")[0], user.name?.split(" ")[1], user.avatar_url);

    if (success) {
      const reSearchUser: any = await selectUserByEmail(user.email);

      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5h" });

      return NextResponse.json({
        userIsRegister: false,
        token: jwtToken,
        ...payload,
        ...reSearchUser[0],
      });
    } else {
      throw new Error("Error al crear el usuario");
    }
  } catch (error: any) {
    console.error("Error en la autenticación con GitHub:", error.message);
    return NextResponse.json({ error: "Error al autenticar con GitHub" }, { status: 500 });
  }
}
