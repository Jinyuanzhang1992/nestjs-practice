import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LocalStrategy } from './local.strategy';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly localStrategy: LocalStrategy,
  ) {}

  @Mutation(() => LoginResponseDto)
  //   @UseGuards(LocalAuthGuard)
  async login(
    @Args('input') input: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const { username, password } = input;
    const user = await this.localStrategy.validate(username, password);
    const token = await this.authService.login(user);
    return { user, token };
  }
}
