import z from "zod";
export declare const singupBody: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email?: string | undefined;
}, {
    username: string;
    password: string;
    email?: string | undefined;
}>;
export declare const singinBody: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createBlogBody: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogBody: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type singinType = z.infer<typeof singinBody>;
export type singupType = z.infer<typeof singupBody>;
export type createBlogType = z.infer<typeof createBlogBody>;
export type updateBlogType = z.infer<typeof updateBlogBody>;
