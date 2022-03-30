import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("jobs")
class Job {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public description: string;

  @Column()
  public email?: string;

  @Column()
  public whatssap?: string;

  @Column()
  public salary_value: string;

  @UpdateDateColumn()
  public updated_at: string;

  @CreateDateColumn()
  public created_at: string;
}

export { Job };
