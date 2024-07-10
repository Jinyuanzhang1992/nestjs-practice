import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginRequestDto {
  @Field()
  username: string;

  @Field()
  password: string;
}
