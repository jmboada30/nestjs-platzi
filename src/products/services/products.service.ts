import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindConditions, Like, Repository } from 'typeorm';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dtos';
import { Product } from './../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  async findAll(query?: FilterProductsDto) {
    if (query) {
      const where: FindConditions<Product> = {};
      const { limit, offset } = query;
      const { minPrice, maxPrice } = query;
      if (minPrice && maxPrice) where.price = Between(minPrice, maxPrice);
      if (query.like) {
        where.name = Like(`%${query.like}%`);
        where.description = Like(`%${query.like}%`);
      }
      return await this.productRepo.find({ where, take: limit, skip: offset });
    }
    return await this.productRepo.find();
  }

  // cuando usamos este metodo lo hacemos para buscar los detalle de un producto en especifico.
  // no es recomendable sobrecargar el metodo findAll.
  async findOne(id: number) {
    const found = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!found) throw new NotFoundException(`Product #${id} not found`);
    return found;
  }

  async create(data: CreateProductDto) {
    try {
      const newProduct = this.productRepo.create(data);
      if (data.brandId) {
        newProduct.brand = await this.brandRepo.findOne(data.brandId);
      }

      if (data.categoriesIds) {
        newProduct.categories = await this.categoryRepo.findByIds(
          data.categoriesIds,
        );
      }
      return await this.productRepo.save(newProduct);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    try {
      if (changes.brandId) {
        product.brand = await this.brandRepo.findOne(changes.brandId);
      }

      if (changes.categoriesIds) {
        product.categories = await this.categoryRepo.findByIds(
          changes.categoriesIds,
        );
      }

      this.productRepo.merge(product, changes);
      return await this.productRepo.save(product);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }

  async remove(id: number) {
    await this.productRepo.findOneOrFail(id);
    return await this.productRepo.delete(id);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    try {
      const product = await this.productRepo.findOneOrFail(productId, {
        relations: ['categories'],
      });

      const category = await this.categoryRepo.findOneOrFail(categoryId);

      const idx = product.categories.findIndex(
        (item) => item.id === category.id,
      );

      idx === -1 ? product.categories.push(category) : '';

      return await this.productRepo.save(product);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    try {
      const product = await this.productRepo.findOneOrFail(productId, {
        relations: ['categories'],
      });
      product.categories = product.categories.filter(
        (item) => item.id !== categoryId,
      );
      return await this.productRepo.save(product);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }
}
