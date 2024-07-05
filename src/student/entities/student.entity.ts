import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('students')
export class StudentEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  college: string;

  @Column({ type: 'text', nullable: false })
  course: string;

  @Column({ type: 'text', nullable: false, unique: true })
  cpf: string;

  @Column({ type: 'text', nullable: false, unique: true })
  registration: string;

  @Column({ name: 'valid_until', type: 'text', nullable: false })
  validUntil: string;

  @Column({ name: 'use_code', type: 'text', nullable: false, unique: true })
  useCode: string;

  @Column({ name: 'picture_file', type: 'text', nullable: false, unique: true })
  pictureFile: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

}