import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {

	private jwtSecretKey: string
	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
	) {
		this.jwtSecretKey = process.env.SECRET_KEY
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest();
			const authHeader = request.headers.authorization

			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				throw new UnauthorizedException(`Missing Authentication Token`)
			}

			const token: string = authHeader.split(" ")[1]
			if (!token) throw new UnauthorizedException(`Missing Authentication Token`)

			const decoded = await this.jwtService.verify(token, { secret: this.jwtSecretKey })

			const user: User = await this.userRepo.findOne({ where: { id: decoded?.sub } })
			if (!user) throw new UnauthorizedException(`Ro'yxatdan o'tmagan user`)

			request.user = user
			return true
		} catch (error: any) {
			if (error.name === "JsonWebTokenError") throw new BadRequestException("Xato token")

			if (error.name === "TokenExpiredError") throw new BadRequestException("Token amal qilish mudвati tugagan")

			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
