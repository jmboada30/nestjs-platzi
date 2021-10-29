import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { BaseFilterDto } from '../../common/dtos/paginates.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: Category[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto extends BaseFilterDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  @Type(() => Number)
  maxPrice: number;

  @IsOptional()
  @IsString()
  like: string;
}
