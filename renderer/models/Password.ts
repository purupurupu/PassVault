// models/Password.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  encryptedPassword!: string;

  @ManyToOne(() => User, (user) => user.passwords)
  user!: User;
}
