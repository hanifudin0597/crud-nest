import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data: users,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.findOne(id);
    if (user) {
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: user,
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'User not found',
        data: null,
      });
    }
  }

  @Post()
  async create(@Body() user: User, @Res() res: Response): Promise<Response> {
    const newUser = await this.userService.create(user);
    return res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message: 'User created successfully',
      data: newUser,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: User,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userService.update(id, user);
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'User updated successfully',
      data: null,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userService.remove(id);
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'User deleted successfully',
      data: null,
    });
  }
}
