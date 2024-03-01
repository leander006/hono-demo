import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

// Create the main Hono app
type Bindings = {
	DATABASE_URL: string,
	JWT_SECRET:string,
    }
const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if(!jwt){
		c.status(401)
		return c.json({error:"No token found"})
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token,c.env.JWT_SECRET)
	if(!payload){
		c.status(404)
		return c.json({error:"Unauthorize"})
	}
	c.set("jwtPayload",payload.id)
	await next()
})

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

app.get('/api/v1/blog/:id', async(c) => {
	 
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())

	const id = c.req.param('id')
	console.log(id);
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

app.post('/api/v1/blog', async(c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	  
	try {
		const body = await c.req.json()
		const blog = await prisma.post.create({
			data:{
				title:body.title,
				content:body.content,
				authorId:c.get("jwtPayload"),
			}
		})
		console.log(blog);
		c.status(200)
		return c.json({message:"Blog created successfully"})
	} catch (error) {
		c.status(404)
		return c.json({error})
	}
})

app.put('/api/v1/blog', (c) => {
	
	return c.text('signin route')
})

export default app;
