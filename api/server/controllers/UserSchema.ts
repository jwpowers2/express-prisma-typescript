import { z } from "zod";

const UserSchema = z.object({
    email:z.string().min(3).max(255),
    name: z.string().min(3).max(255),
    role: z.enum(['user', 'admin'])
})
export default UserSchema;