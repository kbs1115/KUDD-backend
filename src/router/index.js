import express from 'express';

import postRouter from './post.js';

const router = express.Router();

router.use('/post', postRouter);

router.get('/', (req, res) => {
	res.send('Hello World!');
});

export default router;
