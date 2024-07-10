import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  password?: string;
}

@ObjectType()
export class UserMongo {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  gender?: string;
}
