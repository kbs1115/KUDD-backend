import { EntitySchema } from 'typeorm';

export const categorySchema = new EntitySchema({
  name: 'category',
  tableName: 'category',
  columns: {
    //category는 이름 하나만 있어도 된다.
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
  },
  relations: {
    //post와의 관계를 설정
    posts: {
      type: 'one-to-many',
      target: 'post',
      inverseSide: 'category',
    },
  },
});

const postSchema = new EntitySchema({
  name: 'post',
  tableName: 'post',
  columns: {
    //제목, 내용, 쓴 날짜를 저장한다.
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    title: {
      type: 'varchar',
      length: 100,
    },
    content: {
      type: 'text',
    },
    date: {
      type: 'timestamp',
    },
  },
  relations: {
    //category, user 정보를 저장하고, comment에 대한 관계를 정의함.
    category: {
      type: 'many-to-one',
      target: 'category',
      joinColumn: { name: 'category_id' },
    },
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
    },
    comments: {
      type: 'one=to-many',
      target: 'comment',
      inverseSide: 'post',
    },
  },
});

export const commentSchema = new EntitySchema({
  name: 'comment',
  tableName: 'comment',
  columns: {
    //댓글에는 내용, 쓴 시간만 저장하면 된다.
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    content: {
      type: 'text',
    },
    date: {
      type: 'timestamp',
    },
  },
  relations: {
    //post, user, 다른 comment에 대한 id를 저장하고, 매핑한다.
    post: {
      type: 'many-to-one',
      target: 'post',
      joinColumn: { name: 'post_id' },
    },
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
    },
    comment_parent: {
      type: 'many-to-one',
      target: 'comment',
      joinColumn: { name: 'parent_id' },
    },
    comment_child: {
      type: 'one-to-many',
      target: 'comment',
      inverseSide: 'comment_parent',
      cascade: true,
    },
  },
});

export default postSchema;
