import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/lib/actions";
import { redirect } from "next/navigation";


export async function GET() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const dbUser = await findUser(user.id);
  if (!dbUser?.onBoarded) redirect("/onboarding");

  redirect("/home/page");
}
