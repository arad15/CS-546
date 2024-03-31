import {Router} from 'express';
const router = Router();
import {postData, userData} from '../data/index.js';
import validation from '../validation.js';

router.route('/new').get(async (req, res) => {
  const users = await userData.getAllUsers(); // first gets all users because of the Poster drop-down
  res.render('posts/new', {users: users}); // pass all users to views/posts/new.handlebars 
});
router
  .route('/')
  .get(async (req, res) => {
    try {
      const postList = await postData.getAllPosts(); // querying database for all posts
      // instead of res.json, we a rendering the handlebars file
      // 2 parameters: the handlebar file to render, and the data passed into the template
      res.render('posts/index', {posts: postList}); // loads views/posts/index.handlebars
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    const blogPostData = req.body;
    let errors = []; // we push any of the following errors into an array
    try {
      blogPostData.title = validation.checkString(blogPostData.title, 'Title');
    } catch (e) {
      errors.push(e);
    }

    try {
      blogPostData.body = validation.checkString(blogPostData.body, 'Body');
    } catch (e) {
      errors.push(e);
    }

    try {
      blogPostData.posterId = validation.checkId(
        blogPostData.posterId,
        'Poster ID'
      );
    } catch (e) {
      errors.push(e);
    }

    if (blogPostData.tags) {
      let tags = blogPostData.tags.split(',');
      try {
        blogPostData.tags = validation.checkStringArray(tags, 'Tags');
      } catch (e) {
        errors.push(e);
      }
    }

    // if any errors occur, pass them into the template
    if (errors.length > 0) {
      const users = await userData.getAllUsers(); // need to do this again to pass onto the template below
      // pass in array of errors and the data that was filled out, and then we repopulate the dropdown with all users
      res.render('posts/new', {
        errors: errors,
        hasErrors: true,
        post: blogPostData,
        users: users
      });
      return;
    }

    // if the user submitted correct data:
    try {
      const {title, body, tags, posterId} = blogPostData;
      const newPost = await postData.addPost(title, body, posterId, tags);
      res.redirect(`/posts/${newPost._id}`); // redirect user to their created post as a rendered page
      // runs the code in route(':/id').get
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .put(async (req, res) => {
    res.send('ROUTED TO PUT ROUTE');
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param'); 
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const post = await postData.getPostById(req.params.id);// query db for one specific route
      res.render('posts/single', {post: post}); // render the single.handlebars, passing in the single post
      // this is also ran after successfully creating a post using the form
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    const updatedData = req.body;
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

    try {
      const updatedPost = await postData.updatePostPut(
        req.params.id,
        updatedData
      );
      res.json(updatedPost);
    } catch (e) {
      let status = e[0];
      let message = e[1];
      res.status(status).json({error: message});
    }
  })
  .patch(async (req, res) => {
    const requestBody = req.body;
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

    try {
      const updatedPost = await postData.updatePostPatch(
        req.params.id,
        requestBody
      );
      res.json(updatedPost);
    } catch (e) {
      let status = e[0];
      let message = e[1];
      res.status(status).json({error: message});
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let deletedPost = await postData.removePost(req.params.id);
      res.status(200).json(deletedPost);
    } catch (e) {
      let status = e[0];
      let message = e[1];
      res.status(status).json({error: message});
    }
  });

router.route('/tag/:tag').get(async (req, res) => {
  try {
    req.params.tag = validation.checkString(req.params.tag, 'Tag');
  } catch (e) {
    return res.status(400).json({error: e});
  }
  try {
    const postList = await postData.getPostsByTag(req.params.tag);
    res.render('posts/index', {posts: postList});
  } catch (e) {
    res.status(400).json({error: e});
  }
});

router.route('/tag/rename').patch(async (req, res) => {
  try {
    req.body.oldTag = validation.checkString(req.body.oldTag, 'Old Tag');
    req.body.newTag = validation.checkString(req.body.newTag, 'New Tag');
  } catch (e) {
    res.status(400).json({error: e});
  }

  try {
    let getNewTagPosts = await postData.renameTag(
      req.body.oldTag,
      req.body.newTag
    );
    res.json(getNewTagPosts);
  } catch (e) {
    let status = e[0];
    let message = e[1];
    res.status(status).json({error: message});
  }
});

export default router;
