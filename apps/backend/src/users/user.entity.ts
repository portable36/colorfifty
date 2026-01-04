import { ObjectType, Field, ID } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  password: string; // NOT exposed in GraphQL

  @Field(() => UserRole)
  role: UserRole;
}
