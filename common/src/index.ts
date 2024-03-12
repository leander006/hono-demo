import z from "zod"

export const singupBody = z.object({
      username:z.string(),
      email:z.string().email().optional(),
      password:z.string().min(6)
})

export const singinBody = z.object({
      username:z.string(),
      password:z.string().min(6)
})

export const createBlogBody = z.object({
      title:z.string(),
      content:z.string(),
})

export const updateBlogBody = z.object({
      title:z.string(),
      content:z.string(),
      id:z.string()
})

export type singinType =z.infer<typeof singinBody>
export type singupType =z.infer<typeof singupBody>
export type createBlogType =z.infer<typeof createBlogBody>
export type updateBlogType =z.infer<typeof updateBlogBody>