import { NestMiddleware } from '@nestjs/common';

export class loggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}
