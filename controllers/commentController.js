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
      res.status(201).json({
        message: `Successfully commented on thread with ID ${threadId}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editComment(req, res, next) {
    try {
      const { comment, explicit } = req.body;
      const { commentId } = req.params;
      const editedComment = await Comment.update(
        { comment, explicit },
        {
          where: {
            id: commentId,
          },
        }
      );
      res.status(200).json({ message: "Successfully edited comment" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
