import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (r) => r.rolePermissions)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, (p) => p.rolePermissions)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
