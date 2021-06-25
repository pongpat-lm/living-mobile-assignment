import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './category.model'; 
import { CreateCategoryDto } from './dto/createCategory.dto';
@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(CategoryModel) // inject model and use it as repository
        private categoryRepo: typeof CategoryModel, // UserModel act like userRepo here.
      ) {}
    
      create(category: CreateCategoryDto) {
          // userRepo is Sequelize model it have many functions to work with database.
          // more info please see below documents.
          return this.categoryRepo.create(category);
      }

      findById(id: string) {
        return this.categoryRepo.findByPk(id);
      }
    
      findAll() {
          return this.categoryRepo.findAll();
      }

      update(category: CreateCategoryDto, id: string) {
        return this.categoryRepo.update(category, { where: { id: id } });
      }
    
      delete(id: string) {
        return this.categoryRepo.destroy({ where: { id: id } });
      }
}
