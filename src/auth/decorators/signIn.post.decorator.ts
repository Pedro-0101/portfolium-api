import { applyDecorators, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Public } from "src/decorators/public.decorator";

export function AuthLoginDecorator(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    Public(),
    Post('login'),
  )
}