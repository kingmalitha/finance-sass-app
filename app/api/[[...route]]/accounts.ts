import { Hono } from "hono";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { nanoid } from "nanoid";
import { and, eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
      //   throw new HTTPException(401, {
      //     res: c.json({ error: "Unauthorized" }, 401),
      //   });
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) return c.json({ error: "Missing id" }, 400);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
          )
        );

      if (!data)
        return c.json({ error: "Not found!" }, 404);

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertAccountSchema.pick({ name: true })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      //   In here, we know we are getting only one item in the array, therefore we can destructure it like this : [data]. This is a shorthand for data[0], returning the first item in the array.

      const [data] = await db
        .insert(accounts)
        .values({
          id: nanoid(),
          userId: auth.userId,
          ...values,
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { ids } = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, ids)
          )
        )
        .returning({
          id: accounts.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({ id: z.string().optional() })
    ),
    zValidator(
      "json",
      insertAccountSchema.pick({ name: true })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) return c.json({ error: "Missing id" }, 400);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .update(accounts)
        .set(values)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
          )
        )
        .returning();

      if (!data)
        return c.json({ error: "Not found!" }, 404);

      return c.json({ data });
    }
  );

export default app;
