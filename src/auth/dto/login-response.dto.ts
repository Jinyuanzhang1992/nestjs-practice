import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../modules/user/types';

@ObjectType()
export class LoginResponseDto {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
