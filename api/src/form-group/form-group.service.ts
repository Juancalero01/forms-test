import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateFormGroupDto } from './dto/create-form-group.dto';
import { UpdateFormGroupDto } from './dto/update-form-group.dto';
import { FormGroup } from 'src/form-group/entities/form-group.entity';
import { FormField } from 'src/form-field/entities/form-field.entity';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class FormGroupService {
  constructor(
    @InjectRepository(FormGroup)
    private readonly formGroupRepository: Repository<FormGroup>,
    @InjectRepository(FormField)
    private readonly formFieldRepository: Repository<FormField>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(createFormGroupDto: CreateFormGroupDto) {
    return 'This action adds a new formGroup';
  }

  findAll() {
    return `This action returns all formGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formGroup`;
  }

  update(id: number, updateFormGroupDto: UpdateFormGroupDto) {
    return `This action updates a #${id} formGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} formGroup`;
  }

  async getGroupStructure(groupId: number, roleName: string): Promise<any> {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });
    if (!role) throw new NotFoundException('Rol no encontrado');

    const group = await this.formGroupRepository.findOne({
      where: { id: groupId },
      relations: [
        'memberships',
        'memberships.form',
        'memberships.form.subject',
      ],
    });

    if (!group) throw new NotFoundException('Grupo no encontrado');

    const forms = await Promise.all(
      group.memberships.map(async (membership) => {
        const form = membership.form;
        const fields = await this.formFieldRepository.find({
          where: { form: { id: form.id } },
          relations: [
            'fieldPermissions',
            'fieldPermissions.role',
            'fieldPermissions.action',
            'dataPermissions',
            'dataPermissions.role',
          ],
          order: { orderIndex: 'ASC' },
        });

        const structuredFields = fields.map((field) => {
          const perms = field.fieldPermissions.filter(
            (fp) => fp.role.id === role.id,
          );
          const canRead = perms.some(
            (p) => p.action.name === 'read' && p.isAllowed,
          );
          const canEdit = perms.some(
            (p) => p.action.name === 'update' && p.isAllowed,
          );

          const allOptions = field.optionsJson
            ? JSON.parse(field.optionsJson)
            : null;
          const allowedValues = field.dataPermissions
            .filter((dp) => dp.role.id === role.id)
            .map((dp) => dp.allowedValue);

          const filteredOptions =
            allowedValues.length && allOptions
              ? allOptions.filter((opt) => allowedValues.includes(opt.value))
              : allOptions;

          return {
            name: field.name,
            label: field.label,
            type: field.type,
            isRequired: field.isRequired,
            canRead,
            canEdit,
            options: filteredOptions,
          };
        });

        return {
          formId: form.id,
          formName: form.name,
          subject: form.subject.name,
          fields: structuredFields,
        };
      }),
    );

    return {
      groupId: group.id,
      groupName: group.name,
      forms,
    };
  }
}
