import { z } from "zod";

export const postUserAccountSchema = z.object({
  email: z.string().email(),
  globalUsername: z.string(),
});

export const staticUserAccountInfoSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const contributionSchema = z.object({
  id: z.number(),
  date: z.string(),
  count: z.number(),
  gitAccountId: z.number(),
});

export const gitAccountSchema = z.object({
  id: z.number(),
  source: z.string(),
  username: z.string(),
  contributions: z.array(contributionSchema),
});

export const accountResponseSchema = postUserAccountSchema.merge(staticUserAccountInfoSchema);
export const getAllAccountsSchema = z.array(accountResponseSchema);
export const getAccountSchema = accountResponseSchema.merge(
  z.object({
    accounts: z.array(gitAccountSchema),
  })
);

export type BackendContribution = z.infer<typeof contributionSchema>;
