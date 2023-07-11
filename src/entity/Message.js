import { EntitySchema } from 'typeorm';

const messageSchema = new EntitySchema({
  name: 'message',
  tableName: 'message',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    content: {
      type: 'text',
    },
    //날짜와 시간을 둘 다 받는다.
    sent_time: {
      type: 'timestamp',
    },
  },
  relations: {
    //sender, receiver 정보를 각각 fk로 저장한다.
    sender: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'sender_id' },
    },
    receiver: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'receiver_id' },
    },
  },
});

export default messageSchema;
