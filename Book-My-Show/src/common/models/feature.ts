import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { FeatureType } from './FeatureType';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: FeatureType,
    default: FeatureType.THREE_D,
  })
  type!: FeatureType;
}
