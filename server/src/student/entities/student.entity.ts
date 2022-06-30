import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  dob: Date;

  @Index({ fulltext: true })
  @Column()
  email: string;
}
