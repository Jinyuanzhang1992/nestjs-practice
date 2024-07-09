import { PartialType, InputType } from '@nestjs/graphql';
import { CreateMongoUserDto } from './create-mongo-user.dto';

@InputType()
export class UpdateMongoUserDto extends PartialType(CreateMongoUserDto) {}
