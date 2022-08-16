const getAge = require("../helpers/dateToAge");
const { Profile, Thread, Comment, ProfileLikeThread } = require("../models");

async function authorization(req, res, next) {
  try {
    const { profileId } = req.params;
    const { id } = req.user;
    const targetProfile = await Profile.findByPk(profileId);
    if (!targetProfile) {
      throw { name: "profileNotFound" };
    }
    if (targetProfile.UserId !== id) {
      throw { name: "unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function threadAccessing(req, res, next) {
  try {
    const { threadId } = req.params;
    const { profileId } = req.user;
    const targetThread = await Thread.findByPk(threadId);
    if (!targetThread) {
      throw { name: "threadNotFound" };
    }
    if (targetThread.ProfileId !== profileId) {
      throw { name: "unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function underAgeAuthorization(req, res, next) {
  try {
    const { birthDate } = req.user;
    const { threadId } = req.params;
    const age = getAge(birthDate);
    const targetThread = await Thread.findByPk(threadId);
    if (!targetThread) {
      throw { name: "threadNotFound" };
    }
    if (targetThread.explicit === true && age < 17) {
      throw { name: "explicitThread" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function editCommentAuthorization(req, res, next) {
  try {
    const { commentId } = req.params;
    const { profileId } = req.user;
    const targetComment = await Comment.findByPk(commentId);
    if (!targetComment) {
      throw { name: "commentNotFound" };
    }
    if (targetComment.ProfileId !== profileId) {
      throw { name: "unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}
async function deleteCommentAuthorization(req, res, next) {
  try {
    const { commentId, threadId } = req.params;
    const { profileId } = req.user;
    const targetComment = await Comment.findByPk(commentId);
    if (!targetComment) {
      throw { name: "commentNotFound" };
    }
    const targetThread = await Thread.findByPk(threadId);
    if (!targetThread) {
      throw { name: "threadNotFound" };
    }
    if (
      targetThread.ProfileId === profileId ||
      targetComment.ProfileId === profileId
    ) {
      next();
    } else {
      throw { name: "unauthorized" };
    }
  } catch (error) {
    next(error);
  }
}

async function dislikeAThreadAuthorization(req, res, next) {
  try {
    const { likeId, threadId } = req.params;
    const { profileId } = req.user;
    const targetLike = await ProfileLikeThread.findByPk(likeId);
    if (!targetLike) {
      throw { name: "likeNotFound" };
    }
    const targetThread = await Thread.findByPk(threadId);
    if (!targetThread) {
      throw { name: "threadNotFound" };
    }
    if (targetLike.ProfileId === profileId) {
      next();
    } else {
      throw { name: "unauthorized" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorization,
  threadAccessing,
  underAgeAuthorization,
  editCommentAuthorization,
  deleteCommentAuthorization,
  dislikeAThreadAuthorization,
};
