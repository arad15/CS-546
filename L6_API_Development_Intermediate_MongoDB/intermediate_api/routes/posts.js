import {Router} from 'express';
const router = Router();
import {postData} from '../data/index.js';
import validation from '../validation.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      const postList = await postData.getAllPosts();
      return res.json(postList);
    } catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    const blogPostData = req.body;
    //make sure there is something present in the req.body
    if (!blogPostData || Object.keys(blogPostData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    //check all inputs, that should respond with a 400
    try {
      blogPostData.title = validation.checkString(blogPostData.title, 'Title');
      blogPostData.body = validation.checkString(blogPostData.body, 'Body');
      blogPostData.posterId = validation.checkId(
        blogPostData.posterId,
        'Poster ID'
      );
      if (blogPostData.tags) {
        blogPostData.tags = validation.checkStringArray(
          blogPostData.tags,
          'Tags'
        );
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }

    //insert the post
    try {
      const {title, body, tags, posterId} = blogPostData;
      const newPost = await postData.addPost(title, body, posterId, tags);
      return res.json(newPost);
    } catch (e) {
      return res.status(500).json({error: e});
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    //check inputs that produce 400 status
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try getting the post by ID
    try {
      const post = await postData.getPostById(req.params.id);
      return res.json(post);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    const updatedData = req.body;
    //make sure there is something in the req.body
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    //check all the inputs that will return 400 if they fail
    try {
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      updatedData.title = validation.checkString(updatedData.title, 'Title');
      updatedData.body = validation.checkString(updatedData.body, 'Body');
      updatedData.posterId = validation.checkId(
        updatedData.posterId,
        'Poster ID'
      );
      if (updatedData.tags) {
        if (!Array.isArray(updatedData.tags)) {
          updatedData.tags = [];
        } else {
          updatedData.tags = validation.checkStringArray(
            updatedData.tags,
            'Tags'
          );
        }
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to update the post
    try {
      const updatedPost = await postData.updatePostPut(
        req.params.id,
        updatedData
      );
      return res.json(updatedPost);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .patch(async (req, res) => {
    const requestBody = req.body;
    //check to make sure there is something in req.body
    if (!requestBody || Object.keys(requestBody).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    //check the inputs that will return 400 is fail
    try {
      req.params.id = validation.checkId(req.params.id, 'Post ID');
      if (requestBody.title)
        requestBody.title = validation.checkString(requestBody.title, 'Title');
      if (requestBody.body)
        requestBody.body = validation.checkString(requestBody.body, 'Body');
      if (requestBody.posterId)
        requestBody.posterId = validation.checkId(
          requestBody.posterId,
          'Poster ID'
        );
      if (requestBody.tags)
        requestBody.tags = validation.checkStringArray(
          requestBody.tags,
          'Tags'
        );
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to perform update
    try {
      const updatedPost = await postData.updatePostPatch(
        req.params.id,
        requestBody
      );
      return res.json(updatedPost);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //check the id
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to delete post
    try {
      let deletedPost = await postData.removePost(req.params.id);
      return res.json(deletedPost);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

router.route('/tag/:tag').get(async (req, res) => {
  //check input
  try {
    req.params.tag = validation.checkString(req.params.tag, 'Tag');
  } catch (e) {
    return res.status(400).json({error: e});
  }
  //try to get all posts by tag
  try {
    const postList = await postData.getPostsByTag(req.params.tag);
    return res.json(postList);
  } catch (e) {
    return res.status(404).json({error: e});
  }
});

router.route('/tag/rename').patch(async (req, res) => {
  //check req.body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({error: 'There are no fields in the request body'});
  }
  //check input params
  try {
    req.body.oldTag = validation.checkString(req.body.oldTag, 'Old Tag');
    req.body.newTag = validation.checkString(req.body.newTag, 'New Tag');
  } catch (e) {
    return res.status(400).json({error: e});
  }

  try {
    let getNewTagPosts = await postData.renameTag(
      req.body.oldTag,
      req.body.newTag
    );
    return res.json(getNewTagPosts);
  } catch (e) {
    return res.status(404).json({error: e});
  }
});

export default router;
