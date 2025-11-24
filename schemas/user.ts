import zod from "zod"

export const userSchema = zod.object({
  bankingName: zod.string(),
  upiId: zod.string(),
})