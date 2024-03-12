import {posts} from '../config/mongoCollections.js';
import userData from './users.js';
import {ObjectId} from 'mongodb';
import validation from '../validation.js';

const exportedMethods = {
  async getAllPosts() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },

  async getPostById(id) {
    id = validation.checkId(id);
    const postCollection = await posts();
    const post = await postCollection.findOne({_id: new ObjectId(id)});
    if (!post) throw 'Error: Post not found';

    return post;
  },
  async getPostsByTag(tag) {
    tag = validation.checkString(tag, 'Tag');
    const postCollection = await posts();
    return await postCollection.find({tags: tag}).toArray();
  },
  async addPost(title, body, posterId, tags) {
    title = validation.checkString(title, 'Title');
    body = validation.checkString(body, 'Body');
    posterId = validation.checkId(posterId, 'Poster ID');
    if (!Array.isArray(tags)) {
      tags = [];
    } else {
      tags = validation.checkStringArray(tags, 'Tags');
    }
    const userThatPosted = await userData.getUserById(posterId);
    if (!userThatPosted) throw 'User for post not found';

    const newPost = {
      title: title,
      body: body,
      poster: {
        id: new ObjectId(posterId),
        name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
      },
      tags: tags
    };
    const postCollection = await posts();
    const newInsertInformation = await postCollection.insertOne(newPost);
    const newId = newInsertInformation.insertedId;
    return await this.getPostById(newId.toString());
  },
  async removePost(id) {
    id = validation.checkId(id);
    const postCollection = await posts();
    const deletionInfo = await postCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });
    if (!deletionInfo) throw `Could not delete post with id of ${id}`;
    return {...deletionInfo, deleted: true};
  },
  async updatePostPut(id, updatedPost) {
    id = validation.checkId(id);
    updatedPost.title = validation.checkString(updatedPost.title, 'title');
    updatedPost.body = validation.checkString(updatedPost.body, 'body');
    updatedPost.posterId = validation.checkId(updatedPost.posterId);
    if (!Array.isArray(updatedPost.tags)) {
      updatedPost.tags = [];
    } else {
      updatedPost.tags = validation.checkStringArray(updatedPost.tags, 'Tags');
    }
    const userThatPosted = await userData.getUserById(updatedPost.posterId);
    if (!userThatPosted) throw 'User for post not found';
    let updatedPostData = {
      title: updatedPost.title,
      body: updatedPost.body,
      poster: {
        id: updatedPost.posterId,
        firstName: userThatPosted.firstName,
        lastName: userThatPosted.lastName
      },
      tags: updatedPost.tags
    };
    const postCollection = await posts();
    const updateInfo = await postCollection.findOneAndReplace(
      {_id: new ObjectId(id)},
      updatedPostData,
      {returnDocument: 'after'}
    );
    if (!updateInfo)
      throw `Error: Update failed! Could not update post with id ${id}`;
    return updateInfo;
  },
  async updatePostPatch(id, updatedPost) {
    const updatedPostData = {};
    if (updatedPost.posterId) {
      updatedPostData['poster.id'] = validation.checkId(
        updatedPost.posterId,
        'Poster ID'
      );

      const userThatPosted = await userData.getUserById(updatedPost.posterId);
      if (!userThatPosted) throw 'User for post not found';
      updatedPostData['poster.firstName'] = userThatPosted.firstName;
      updatedPostData['poster.lastName'] = userThatPosted.lastName;
    }
    if (updatedPost.tags) {
      updatedPostData.tags = validation.checkStringArray(
        updatedPost.tags,
        'Tags'
      );
    }

    if (updatedPost.title) {
      updatedPostData.title = validation.checkString(
        updatedPost.title,
        'Title'
      );
    }

    if (updatedPost.body) {
      updatedPostData.body = validation.checkString(updatedPost.body, 'Body');
    }
    const postCollection = await posts();
    let newPost = await postCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: updatedPostData},
      {returnDocument: 'after'}
    );
    if (!newPost) throw `Could not update the post with id ${id}`;

    return newPost;
  },
  async renameTag(oldTag, newTag) {
    oldTag = validation.checkString(oldTag, 'Old Tag');
    newTag = validation.checkString(newTag, 'New Tag');
    if (oldTag === newTag) throw 'tags are the same';

    let findDocuments = {
      tags: oldTag
    };

    let firstUpdate = {
      $addToSet: {tags: newTag}
    };

    let secondUpdate = {
      $pull: {tags: oldTag}
    };
    const postCollection = await posts();
    let updateOne = await postCollection.updateMany(findDocuments, firstUpdate);
    if (updateOne.matchedCount === 0)
      throw `Could not find any posts with old tag: ${oldTag}`;
    let updateTwo = await postCollection.updateMany(
      findDocuments,
      secondUpdate
    );
    if (updateTwo.modifiedCount === 0) throw [500, 'Could not update tags'];
    return await this.getPostsByTag(newTag);
  }
};

export default exportedMethods;
