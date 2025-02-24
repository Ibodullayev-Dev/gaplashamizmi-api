import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-ioredis-yet"

export const cacheManagerConfig: CacheModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => {
		const store = await redisStore({
			host: configService.get<string>('REDIS_HOST'),
			port: configService.get<number>('REDIS_PORT'),
			password: configService.get<string>('REDIS_PASSWORD'),
		});

		return {
			store,
			ttl: configService.get<number>('CACHE_TTL') || 60,
		}
	},
}