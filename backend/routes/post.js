
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postController = require('../controllers/post');

router.get('/posts', auth, postController.getAllPosts);
router.get('/post/:id', auth, postController.getOnePost);
router.post('/post', auth, multer, postController.createPost);
router.put('/post/:id', auth, multer, postController.updatePost);
router.delete('/post/:id', auth, multer,  postController.deletePost);

module.exports = router;