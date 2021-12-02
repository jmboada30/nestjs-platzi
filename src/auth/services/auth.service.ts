import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const passOk = await bcrypt.compare(password, user.password);

    if (user && passOk) {
      return user;
    }

    return null;
  }
}
