import { Injectable } from '@nestjs/common';
import { createProductDto } from './dto/create-product.dto.js';
import { Product, ProductDocument } from './schema/product.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async createProduct(createProductDto: createProductDto) {
    console.log('createProductDto', createProductDto);
    await this.productModel.create(createProductDto);
    return { msg: 'Product has been created.' };
  }
}
