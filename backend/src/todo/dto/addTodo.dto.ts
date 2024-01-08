import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class AddTodoDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty()
  title: string;
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
