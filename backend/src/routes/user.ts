import { PrismaClient } from '@prisma/client/edge'

import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

type Bindings = {
	DATABASE_URL: string,
	JWT_SECRET:string,
}


const user = new Hono<{ Bindings: Bindings}>();

user.post('signup', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())

	const body = await c.req.json()  
      console.log(body);
      

	try {
		const user = await prisma.user.findUnique({
			where:{
				username:body.username,
			}
		})
	
		if(user){
			c.status(404);
			return c.json({error:"User exist"})
		}
		await prisma.user.create({
			data:{
				username:body.username,
				email:body.email,
				password:body.password
			},
		})
		c.status(200)
		return c.json("Sign up successfully")

	} catch (error) {
		c.status(505)
		return c.json({error:error})
	}
})

user.post('/signin', async(c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())

	  try {
		
		const body = await c.req.json()
		const secret =  c.env.JWT_SECRET
		const user = await prisma.user.findUnique({
			where:{
				username:body.username,
			}
		})
		if(!user){
			c.status(404);
			return c.json({error:"User does not exist"})
		}

		const token = await sign({id:user.id}, secret)
		c.status(200)
		return c.json(token)
	  } catch (error) {
		c.status(505)
		return c.json(error)
	  }
})

export default user;