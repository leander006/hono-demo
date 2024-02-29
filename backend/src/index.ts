import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

// Create the main Hono app
type Bindings = {
	DATABASE_URL: string,
	JWT_SECRET:string,
    }
const app = new Hono<{ Bindings: Bindings }>();

app.post('/api/v1/signup', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())

	const body = await c.req.json()  

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

app.post('/api/v1/signin', async(c) => {

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

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
