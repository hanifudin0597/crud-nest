import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() product: Product,
    @Res() res: Response,
  ): Promise<Response> {
    const newProduct = await this.productsService.create(product);
    return res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: newProduct,
    });
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const products = await this.productsService.findAll();
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Products retrieved successfully',
      data: products,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const product = await this.productsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Product retrieved successfully',
      data: product,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Product,
    @Res() res: Response,
  ): Promise<Response> {
    const updatedProduct = await this.productsService.update(+id, product);
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.productsService.remove(+id);
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Product deleted successfully',
    });
  }
}
