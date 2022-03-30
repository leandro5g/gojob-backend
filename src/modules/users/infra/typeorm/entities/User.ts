import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public cpf: string;

  @Column()
  public password: string;

  @Column()
  public avatar: string;

  @UpdateDateColumn()
  public updated_at: string;

  @CreateDateColumn()
  public created_at: string;
}

export { User };
