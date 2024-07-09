import { Field, InputType } from '@nestjs/graphql';
// import { IsInt, IsOptional, IsString, Min } from 'class-validator';
//使用class-validator库中的装饰器进行数据验证

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field({ nullable: true })
  gender?: string;
}
