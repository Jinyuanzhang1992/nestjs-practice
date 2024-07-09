import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateMongoUserDto {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field({ nullable: true })
  gender?: string;
}
