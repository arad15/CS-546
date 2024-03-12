import {Router} from 'express';
const router = Router();
import {userData} from '../data/index.js';
import validation from '../validation.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let userList = await userData.getAllUsers();
      return res.json(userList);
    } catch (e) {
      return res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {
      userInfo.firstName = validation.checkString(
        userInfo.firstName,
        'First Name'
      );
      userInfo.lastName = validation.checkString(
        userInfo.lastName,
        'Last Name'
      );
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const newUser = await userData.addUser(
        userInfo.firstName,
        userInfo.lastName
      );
      return res.json(newUser);
    } catch (e) {
      return res.sendStatus(500);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let user = await userData.getUserById(req.params.id);
      return res.json(user);
    } catch (e) {
      return res.status(404).json({error: 'User not found'});
    }
  })
  .put(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      userInfo.firstName = validation.checkString(
        userInfo.firstName,
        'First Name'
      );
      userInfo.lastName = validation.checkString(
        userInfo.lastName,
        'Last Name'
      );
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const updatedUser = await userData.updateUserPut(
        req.params.id,
        userInfo.firstName,
        userInfo.lastName
      );
      return res.json(updatedUser);
    } catch (e) {
      return res.status(404).send({error: e});
    }
  })
  .patch(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      if (userInfo.firstName) {
        userInfo.firstName = validation.checkString(
          userInfo.firstName,
          'First Name'
        );
      }

      if (userInfo.lastName) {
        userInfo.lastName = validation.checkString(
          userInfo.lastName,
          'Last Name'
        );
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const updatedUser = await userData.updateUserPatch(
        req.params.id,
        userInfo
      );
      return res.json(updatedUser);
    } catch (e) {
      return res.status(404).send({error: e});
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      let deletedUser = await userData.removeUser(req.params.id);
      return res.json(deletedUser);
    } catch (e) {
      return res.status(404).send({error: e});
    }
  });

export default router;
