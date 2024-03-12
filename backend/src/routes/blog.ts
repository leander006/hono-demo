import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogBody,updateBlogBody} from "@leander006/blog-common"
type Bindings = {
	DATABASE_URL: string,
	JWT_SECRET:string,
}
type Variables ={
      userId:string
}


const blog = new Hono<{ Bindings: Bindings,Variables:Variables  }>();


blog.use('/*', async (c, next) => {
	try {
		const jwt = c.req.header('authorization');
		if(!jwt){
			c.status(404);
			return c.json("Add jwt token")
		}
		const token = jwt.split(' ')[1];
		const payload = await verify(token,c.env.JWT_SECRET)
		console.log("payload ",payload);
		await next()
	} catch (error) {
		c.status(403);
		console.log(error);
		return c.json(error)
	}
})




blog.get('/:id', async(c) => {
	 
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())

	const id = c.req.param('id')
	try {
		const blog = await prisma.post.findUnique({
			select:{
				title:true,
				content:true,
				published:true,
				author:true
			},
			where:{
				id
			},
			
		})
		console.log(blog);
		c.status(200)
		return c.json(blog)
		
	} catch (error) {
		c.status(404)
		return c.json(error)
	}

})

blog.post('/', async(c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	const body = await c.req.json()

	const {success} = createBlogBody.safeParse(body)
	if(!success){
		c.status(403)
		return c.json({message:"Inputs are incorrect"})
	}
	try {
		const blog = await prisma.post.create({
			data:{
				title:body.title,
				content:body.content,
				authorId:c.get("userId"),
			}
		})
		console.log(blog);
		c.status(200)
		return c.json({data:blog,message:"Blog created successfully"})
	} catch (error) {
		c.status(404)
		return c.json({error})
	}
})

blog.put('/:id', async(c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	const id = c.req.param("id")   
	const body = await c.req.json()
	const {success} = updateBlogBody.safeParse(body)
	if(!success){
		c.status(403)
		return c.json({message:"Inputs are incorrect"})
	} 
	try {
		const blog = await prisma.post.update({
			where:{
				id,
				authorId:c.get("userId")
			},
			data:{
				title:body.title,
				content:body.content
			}
		})

		console.log(blog);
		c.status(200)
		return c.json({data:blog,message:"Blog updated successfully"})
	} catch (error) {
		c.status(404)
		return c.json({error})
	}
})

blog.delete("/:id",async(c) =>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	const id = c.req.param("id")  
	try {
		await prisma.post.delete({
			where:{
				id,
			}
		})
		c.status(200)
		return c.json({message:"Blog deleted successfully"})
	} catch (error) {
		c.status(404)
		return c.json({error})
	}
})

export default blog;