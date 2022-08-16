const { Comment, ProfileComment } = require("../models");

class CommentController {
  static async createComment(req, res, next) {
    try {
      const { threadId } = req.params;
      const { profileId } = req.user;
      const { comment, explicit } = req.body;
      const createdComment = await Comment.create({
        comment,
        explicit,
        ProfileId: profileId,
        ThreadId: threadId,
      });
      const createdCommentLinkedToProfile = await ProfileComment.create({
        ProfileId: profileId,
        CommentId: createdComment.id,
      });
      res
        .status(201)
        .json({
          message: `Successfully commented on thread with ID ${threadId}`,
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
