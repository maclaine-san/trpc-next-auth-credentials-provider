import { createProtectedRouter } from "../protected-router";

export const userList = createProtectedRouter()
  .query("getUsers",
    {
      resolve({ ctx }) {
        return ctx.prisma.user.findMany()
      }
    },
  )
