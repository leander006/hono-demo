import { Hono } from 'hono';

import blog from "./routes/blog"
import user from './routes/user';

// Create the main Hono app
type Bindings = {
	DATABASE_URL: string,
	JWT_SECRET:string,
}

const app = new Hono<{ Bindings: Bindings }>();


app.route("/api/v1/user",user)
app.route('/api/v1/blog', blog)


export default app;
