import { Entity, Column } from 'typeorm';
import { FeatureType } from './FeatureType';
import { BaseEntity } from './baseEntity';

@Entity('features')
export class Feature extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FeatureType,
    default: FeatureType.THREE_D,
  })
  type!: FeatureType;
}
