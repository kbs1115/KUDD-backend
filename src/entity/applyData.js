import { EntitySchema } from 'typeorm';

export const applyDataSchema = new EntitySchema({
  name: 'apply_data',
  tableName: 'apply_data',
  //primary key
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    //20232 등 5자리의 숫자로 받는다
    applied_semester: {
      type: 'int',
    },
    //1, 2, 3지망을 받음. 2, 3은 null 가능
    applied_major1: {
      type: 'varchar',
      size: 20,
    },
    applied_major2: {
      type: 'varchar',
      size: 20,
      nullable: true,
    },
    applied_major3: {
      type: 'varchar',
      size: 20,
      nullable: true,
    },
    //지원 학점을 입력받는다.
    applied_GPA: {
      type: 'float',
    },
    //재지원 여부를 저장한다.
    is_reapplied: {
      type: 'enum',
      enum: ['yes', 'no'],
    },
    //기타 참고할 사항을 적는 text field
    extra_info: {
      type: 'text',
    },
    //image file의 경로를 저장
    applied_image: {
      type: 'varchar',
      size: 100,
    },
  },
  relations: {
    //user는 오직 하나만 가질 수 있고, 지원 정보는 학기별로 하나이므로 여러 개가 가능하다.
    user: { type: 'many-to-one', target: 'User', joinColumn: { name: 'user_id' } },
  },
});
