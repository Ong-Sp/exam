'use server';

import { redirect } from "next/navigation";
import { logoutUser } from "../../../utils/loginUser";

export default async function logout() {
  await logoutUser();
  redirect("/login");
}
