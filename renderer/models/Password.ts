import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("passwords")
export class Password {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "varchar" })
  title_id!: string;

  @Column({ type: "varchar" })
  encrypted_password!: string;

  @Column({ type: "integer" })
  user_id!: number;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.passwords, { onDelete: "CASCADE" })
  user!: User;
}
