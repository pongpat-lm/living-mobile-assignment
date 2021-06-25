import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuModel } from './menu.model'; 
import { CreateMenuDto } from './dto/createMenu.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(MenuModel) // inject model and use it as repository
        private menuRepo: typeof MenuModel,
      ) {}
    
      create(menu: CreateMenuDto) {
          return this.menuRepo.create(menu);
      }
    
      findById(id: string) {
        return this.menuRepo.findByPk(id);
      }

      findAll() {
          return this.menuRepo.findAll();
      }

      update(menu: CreateMenuDto, id: string) {
        return this.menuRepo.update(menu, { where: { id: id } });
      }

      delete(id: string) {
        return this.menuRepo.destroy({ where: { id: id } });
      }
}
