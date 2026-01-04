import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args('input') input: RegisterInput) {
    const hashed = await this.authService.hashPassword(input.password);

    // TODO: Save user in DB
    const user = {
      id: '1',
      email: input.email,
      password: hashed,
      role: 'CUSTOMER',
    };

    return this.authService.generateToken(user.id, user.role);
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput) {
    // TODO: Fetch user from DB
    const user = {
      id: '1',
      email: input.email,
      password: '$2b$10$hashedpassword',
      role: 'CUSTOMER',
    };

    const isValid = await this.authService.validatePassword(
      input.password,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.authService.generateToken(user.id, user.role);
  }
}
