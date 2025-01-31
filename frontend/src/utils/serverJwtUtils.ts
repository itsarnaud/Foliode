import { User } from "@/interfaces/User";
import { jwtDecode } from "jwt-decode";
import { NextRequest } from "next/server";

export function getDecodedToken(request: NextRequest): User | null {
  const token = request.cookies.get("token_auth")?.value;

  if (!token) {
    return null;
  }
  
  return jwtDecode<User>(token);
}
