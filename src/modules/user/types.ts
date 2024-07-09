import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  gender?: string;
}

@ObjectType()
export class UserMongo {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  gender?: string;
}
