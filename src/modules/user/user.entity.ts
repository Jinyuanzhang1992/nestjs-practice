import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn({ name: 'u_id' })
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  password?: string;
}

//注意，id 指的是实体类中的主键字段，而不是数据库表中的主键字段。在这里，我们使用 @PrimaryGeneratedColumn() 装饰器来指定 id 为主键字段，并且是自动生成的。
//{ name : 'u_id'}用于指定数据库表中的字段名为 u_id，而不是默认的 id。
