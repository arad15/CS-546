import { posts } from "./mongoCollections.js"; // importing posts collection
import dogData from "./dogs.js"; // bringing in data functions from dogs.js
import { ObjectId } from "mongodb"; // bringing in ObjectId from mongo to deal with ObjectId()

const exportedMethods = {
  async getPostById(id) {
    // pretty much that same as getDogById(id)
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "invalid object ID";
    // only difference is the reference to the posts collection
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: new ObjectId(id) }); // converts string to ObjectId
    if (!post) throw "No post with that id";

    return post;
  },

  async getAllPosts() {
    // works just like getAllDogs()
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray(); // for a nice array with just the data
    if (!postList) throw "Could not get all posts";
    return postList;
  },
  async addPost(title, body, posterId) {
    // title of blog post, body of blog post, and id of the dog posting it (why we need getDogById() from dogData)
    if (!title) throw "You must provide a title";
    if (typeof title !== "string") throw "Title must be a string";
    if (title.trim().length === 0)
      throw "Title cannot be an empty string or just spaces";
    if (!body) throw "You must provide a body";
    if (typeof body !== "string") throw "Body must be a string ";
    if (body.trim().length === 0)
      throw "Body cannot be an empty string or just spaces";
    if (!posterId) throw "You must specify a poster";
    if (typeof posterId !== "string") throw "posterId must be a string";
    if (posterId.trim().length === 0)
      throw "PosterId cannot be an empty string or just spaces";
    if (!ObjectId.isValid(posterId)) throw "posterId is not a valid Object ID";
    // trim leading or trailing whitespaces
    title = title.trim();
    body = body.trim();
    posterId = posterId.trim();

    const dogThatPosted = await dogData.getDogById(posterId); // getting that dog
    // lecture recording did not have this
    //if (!dogThatPosted) throw "Could not find a dog with that ID";

    const newPostInfo = {
      title: title,
      body: body,
      // poster is a subdocument
      poster: {
        id: new ObjectId(posterId),
        name: dogThatPosted.name,
      },
    };
    // await posts collection before any function
    const postCollection = await posts();
    const insertInfo = await postCollection.insertOne(newPostInfo);
    // once this is inserted for the first time, a posts collection will be made and show in Compass

    // not acknowledged or has no insertedId
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add post";
    // call getPostById() to return the new post
    const newPost = await this.getPostById(insertInfo.insertedId.toString());

    return newPost;
  },
  async removePost(id) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "invalid object ID";
    const postCollection = await posts();
    // where _id field === id in ObjectId form
    const deletionInfo = await postCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    // lecture recording has this as (deletionInfo.lastErrorObject.n === 0)
    if (!deletionInfo) {
      throw `Could not delete post with id of ${id}`;
    }
    // lecture recording has this as deletionInfo.value.title
    return { postTitle: deletionInfo.title, deleted: true };
  },

  // This is going to be a little different than updateDog()
  async updatePost(id, title, body, posterId) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== "string") throw "Id must be a string";
    if (id.trim().length === 0)
      throw "id cannot be an empty string or just spaces";
    id = id.trim();
    if (!ObjectId.isValid(id)) throw "invalid object ID";
    if (!title) throw "You must provide a title";
    if (typeof title !== "string") throw "Title must be a string";
    if (title.trim().length === 0)
      throw "Title cannot be an empty string or just spaces";
    if (!body) throw "You must provide a body";
    if (typeof body !== "string") throw "Body must be a string ";
    if (body.trim().length === 0)
      throw "Body cannot be an empty string or just spaces";
    if (!posterId) throw "You must specify a poster";
    if (typeof posterId !== "string") throw "posterId must be a string";
    if (posterId.trim().length === 0)
      throw "PosterId cannot be an empty string or just spaces";
    if (!ObjectId.isValid(posterId)) throw "posterId is not a valid Object ID";
    title = title.trim();
    body = body.trim();
    posterId = posterId.trim();

    const dogThatPosted = await dogData.getDogById(posterId);
    // lecture recording omits this if statement
    //if (!dogThatPosted) throw "Could not find a dog with that ID";

    let updatedPost = {
      title: title,
      body: body,
      poster: {
        id: new ObjectId(posterId),
        name: dogThatPosted.name,
      },
    };
    const postCollection = await posts();
    const updatedInfo = await postCollection.findOneAndReplace(
      { _id: new ObjectId(id) },
      updatedPost,
      { returnDocument: "after" }
    );

    // lecturing recording has this as (updatedInfo.lastErrorObject.n === 0)
    if (!updatedInfo) {
      throw "could not update post successfully";
    }

    // lecture recording has this as (return await this.getPostById(id) )
    return updatedInfo;
  },
};

export default exportedMethods; // export all the functions
