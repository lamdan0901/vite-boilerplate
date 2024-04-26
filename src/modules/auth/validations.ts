import { isEmailRefine } from 'utils/zod-refinement';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1).superRefine(isEmailRefine),
  password: z.string().min(1),
  remember: z.any(),
});

export type LoginDto = z.infer<typeof LoginSchema>;
