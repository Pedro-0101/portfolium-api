import { applyDecorators, Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

export function UserControllerDecorator(): ClassDecorator {
  return applyDecorators(
    ApiTags('UserController'),
    Controller('user')
  )
}