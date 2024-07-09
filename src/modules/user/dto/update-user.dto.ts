import { CreateUserDto } from './create-user.dto';
import { Field, InputType, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// @Field(() => Int) 表示该字段在 GraphQL Schema 中的类型是 Int，这让 GraphQL 客户端知道这个字段期望一个整数值。
