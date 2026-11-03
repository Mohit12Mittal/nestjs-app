import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { createProductDto } from './dto/create-product.dto.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  create(@Body() createProductDto: createProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
