import { EntitySchema } from 'typeorm';

export const userSchema = new EntitySchema({
  name: 'User',
  tableName: 'User',
  columns: {
    //primary key
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    //login 시 이용할 ID
    loginID: {
      type: 'varchar',
      length: 25,
    },
    //password hash로 암호화해서 저장해야 함.
    password: {
      type: 'enum',
      enum: ['passer', 'candidate'],
    },
    //nickname 설정
    nickname: {
      type: 'varchar',
      length: 30,
    },
  },
  relations: {
    //passer, candidate 정보 둘 중 하나를 fk로 반드시 가져야 한다.
    passerInfo: {
      type: 'one-to-one',
      target: 'passedUserInfo',
      joinColumn: { name: 'passerInfo_id' },
    },
    candidateInfo: {
      type: 'one-to-one',
      target: 'candidateUserInfo',
      joinColumn: { name: 'candidateInfo_id' },
    },
    //지원 정보와 자료는 여러 개를 가질 수 있음.
    applyInfo: {
      type: 'one-to-many',
      target: 'apply_data',
      inverseSide: 'user',
    },
    courseInfo: {
      type: 'one-to-many',
      target: 'course_data',
      inverseSide: 'user',
    },
    //작성한 post가 user와 연결됨.
    posts: {
      type: 'one-to-many',
      target: 'post',
      inverseSide: 'user',
    },
    //보낸 message가 user와 연결
    send_message: {
      type: 'one-to-many',
      target: 'message',
      inverseSide: 'sender',
    },
    //받은 message가 user와 연결
    receive_message: {
      type: 'one-to-many',
      target: 'message',
      inverseSide: 'receiver',
    },
  },
});

export const passedUserInfoSchema = new EntitySchema({
  name: 'passedUserInfo',
  tableName: 'passedUserInfo',
  //이중전공, 붙은 학기, 학점, 인증 이미지, 자소서 제공 여부를 받는다.
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    second_major: {
      type: 'varchar',
      length: 50,
    },
    //20231과 같은 5자리 문자열로 받는다.
    pass_semester: {
      type: 'varchar',
      length: 5,
    },
    pass_gpa: {
      type: 'float',
    },
    wanna_provide: {
      type: 'enum',
      enum: ['yes', 'no'],
    },
    //image file의 경로를 저장
    passed_image: {
      type: 'varchar',
      size: 100,
    },
  },
  //user와의 관계를 매핑해 준다.
  relations: {
    user: { type: 'one-to-one', target: 'User', inverseSide: 'passerInfo' },
  },
});

export const candidateUserInfoSchema = new EntitySchema({
  name: 'candidateUserInfo',
  tableName: 'candidateUserInfo',
  columns: {
    //학번, 관심 전공, 학점을 입력받는다.
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    hope_major: {
      type: 'varchar',
      length: 50,
    },
    //10자리 문자열로 받는다.
    studentID: {
      type: 'varchar',
      length: 10,
    },
    current_gpa: {
      type: 'float',
    },
  },
  relations: {
    //user와의 관계를 매핑한다.
    user: { type: 'one-to-one', target: 'User', inverseSide: 'candidateInfo' },
  },
});
