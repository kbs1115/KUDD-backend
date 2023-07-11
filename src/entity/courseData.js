import { EntitySchema } from 'typeorm';

export const courseDataSchema = new EntitySchema({
  name: 'course_data',
  tableName: 'course_data',
  //primary key
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    //20232 등 5자리의 숫자로 받는다
    semester: {
      type: 'int',
    },
    //COSE321-00과 같은 10자리 학수번호를 받는다.
    course_code: {
      type: 'varchar',
      length: 10,
    },
    //필기와 족보 보유 여부를 저장한다.
    hasProblems: {
      type: 'enum',
      enum: ['yes', 'no'],
    },
    hasNotes: {
      type: 'enum',
      enum: ['yes', 'no'],
    },
  },
  relations: {
    //user는 오직 하나만 가질 수 있고, 자료는 여러 개를 가질 수 있다.
    user: { type: 'many-to-one', target: 'User', joinColumn: { name: 'user_id' } },
  },
});
