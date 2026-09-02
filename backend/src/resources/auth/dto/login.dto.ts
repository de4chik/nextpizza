import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "../../user/dto/createUser.dto";

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}
