

import PaymentForm from "@/components/forms/PaymentForm";
import { currentUser } from "@clerk/nextjs/server";
import { findUser } from "@/lib/actions";

export default async function GPayEditor() {
  const user = await currentUser();
  const dbUser = await findUser(user?.id || '');

  return (
    <div>
      <PaymentForm name={dbUser?.bankingName || ''} yourupiid={dbUser?.upiId || ''} />
    </div>
  );
}
