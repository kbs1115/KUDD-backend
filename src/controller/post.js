import * as postService from '../service/postService.js';

export const getPostList = async (req, res, next) => {
	try {
		const postList = await postService.getPostList();
		res.status(200).json(postList);
	} catch (err) {
		next(err);
	}
};
