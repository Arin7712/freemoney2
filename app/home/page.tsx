import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/lib/actions";

export default async function Page() {
  // const user = await currentUser();
  // if (!user) redirect("/sign-up");

  // const dbUser = await findUser(user.id);
  // console.log(dbUser?.onBoarded)
  // if (!dbUser?.onBoarded) redirect("/onboarding");

  // Only render this if onboarded!
  return (
    <div>
      Welcome Home
    </div>
  );
}
