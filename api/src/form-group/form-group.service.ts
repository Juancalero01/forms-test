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
    const STATIC_OPTIONS: Record<string, { label: string; value: string }[]> = {
      priority: [
        { label: 'Inmediata', value: '1' },
        { label: 'Alta', value: '2' },
        { label: 'Media', value: '3' },
        { label: 'Baja', value: '4' },
      ],
      state: [
        { label: 'Ingresado a controlnet', value: '1' },
        { label: 'Ingresado a servicio técnico', value: '2' },
        { label: 'Inspección técnica', value: '3' },
        { label: 'Espera de repuestos', value: '4' },
        { label: 'Espera de aprobación de cotización', value: '5' },
        { label: 'En reparación', value: '6' },
        { label: 'No reparado', value: '7' },
        { label: 'Reparado', value: '8' },
        { label: 'Testing de Salida', value: '9' },
        { label: 'Listo para entregar', value: '10' },
        { label: 'Enviado', value: '11' },
        { label: 'Cerrado', value: '12' },
        { label: 'Cancelado', value: '13' },
      ],
      reportTypes: [
        { label: 'Reporte de diagnóstico', value: '1' },
        { label: 'Reporte de reparación', value: '2' },
        { label: 'Reporte de mantenimiento', value: '3' },
        { label: 'Otro', value: '4' },
      ],
      failureTypes: [
        { label: 'Hardware', value: '1' },
        { label: 'Software', value: '2' },
        { label: 'Mantenimiento', value: '3' },
        { label: 'Otro', value: '4' },
      ],
      supplier: [],
      level: [],
    };

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

          let allOptions = field.optionsJson
            ? JSON.parse(field.optionsJson)
            : null;

          if (!allOptions && STATIC_OPTIONS[field.name] && canRead)
            allOptions = STATIC_OPTIONS[field.name];

          const allowedValues = field.dataPermissions
            .filter((dp: any) => dp.role.id === role.id)
            .map((dp: any) => dp.allowedValue);

          const filteredOptions =
            allowedValues.length && allOptions
              ? allOptions.filter((opt: any) => {
                  return allowedValues.includes(String(opt.value));
                })
              : allOptions;

          return {
            name: field.name,
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
