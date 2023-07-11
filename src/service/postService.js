import dataSource from '../config/dataSource.js';

const postRepository = dataSource.getRepository('post');

export const insertPost = async () => {
  try {
    const newPost = {
      name: 'KBS',
      author: 'bruce',
    };
    const newPostList = await postRepository.save(newPost);
  } catch (err) {
    console.error(err);
  }
};

export const getPostList = async () => {
  try {
    const postList = await postRepository.find();
    return postList;
  } catch (err) {
    console.error(err);
  }
};
