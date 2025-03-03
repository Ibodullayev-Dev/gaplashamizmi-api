import { INestApplication } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
// "http://127.0.0.1:5500"
export function corsConfig(app: INestApplication) {
	app.enableCors({
		origin: ["http://localhost:5173", "https://gaplashamiz.netlify.app", ],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
	});
	app.use(cookieParser())

}