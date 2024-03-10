import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type Bindings = {
	DATABASE_URL: string,
	JWT_SECRET:string,
}
type Variables ={
      userId:string
}


const blog = new Hono<{ Bindings: Bindings,Variables:Variables  }>();


blog.use('/*', async (c, next) => {
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
	c.set("userId",payload.id)
	await next()
})




blog.get('/:id', async(c) => {
	 
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

blog.post('/', async(c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate())
	  
	try {
		const body = await c.req.json()
		const blog = await prisma.post.create({
			data:{
				title:body.title,
				content:body.content,
				authorId:c.get("userId"),
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

blog.put('/', (c) => {
	
	return c.text('signin route')
})

export default blog;