import { useState } from 'react';
import { Topic, Comment } from '../interfaces/TopicInterface';
import {
  updateComment,
  addComment,
  deleteComment,
  likeComment,
  disLikeComment,
} from '../api/commentApi';
import { likeTopic, disLikeTopic } from '../api/topicApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatarSvg from '../assets/avatar.svg';

interface OneTopicCardProps {
  topic: Topic;
  refetchTopic: () => void;
}
/**
 * @description OneTopicCard displays a single topic with its comments.
 * @Improvements In order to reduce amount of fetched data we could optimize this by fetching data only once when user go to topic page,
 * and handle data with local array of comments and topic. This way we could avoid fetching data every time user adds a comment or likes a topic.
 */
const OneTopicCard: React.FC<OneTopicCardProps> = ({ topic, refetchTopic }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(topic.isLikedByUser);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>('');
  const [_, setShowAddComment] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState<string>('');

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
      await likeTopic(topic.id);
      refetchTopic();
    } catch (error) {
      toast.error('Updating failed, try again');
    }
  };

  const handleDisLike = async () => {
    setIsLiked(!isLiked);
    try {
      await disLikeTopic(topic.id);
      refetchTopic();
    } catch (error) {
      toast.error('Updating failed, try again');
    }
  };

  const handleLikeComment = async (id: number) => {
    try {
      await likeComment(id);
      refetchTopic();
    } catch (error) {
      toast.error('Updating failed, try again');
    }
  };

  const handleDisLikeComment = async (id: number) => {
    try {
      await disLikeComment(id);
      refetchTopic();
    } catch (error) {
      toast.error('Updating failed, try again');
    }
  };

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent('');
  };

  const handleSaveClick = async (commentId: number) => {
    if (!editedCommentContent.trim()) {
      toast.error('Comment content cannot be empty');
      return;
    }
    try {
      await updateComment({ id: commentId, content: editedCommentContent });
      setEditingCommentId(null);
      toast.success('You successfully updated your comment...');
      refetchTopic();
    } catch (error) {
      toast.error('Updating failed, try again');
    }
  };

  const handleAddComment = async () => {
    if (!newCommentContent.trim()) {
      toast.error('Comment content cannot be empty');
      return;
    }
    try {
      await addComment({ id: topic.id, content: newCommentContent });
      setNewCommentContent('');
      setShowAddComment(false);
      toast.success('You successfully added a new comment...');
      refetchTopic();
    } catch (error) {
      toast.error('Adding comment failed, try again');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      toast.success('You successfully deleted a comment...');
      refetchTopic();
    } catch (error) {
      toast.error('Deleting comment failed, try again');
    }
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2">
      <div className="flex flex-row">
        {topic?.author?.avatarUrl ? (
          <img
            className="w-7 h-7 rounded-full"
            src={topic.author.avatarUrl}
            alt="avatar"
          />
        ) : (
          <img src={avatarSvg} alt="avatar2" className="w-7 h-7 mb-3" />
        )}
        <h5 className="font-medium ml-2">Author: {topic.authorName}</h5>
      </div>
      <a>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {topic.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {topic.description}
      </p>
      <div className="flex flex-row justify-between">
        {topic?.comments?.length > 0 ? (
          <button
            onClick={toggleComments}
            className="inline-flex font-medium items-center text-blue-600 hover:underline"
          >
            {showComments ? 'Hide comments' : 'Show comments'}
          </button>
        ) : (
          <p>No comments yet</p>
        )}
        <div className="flex flex-row">
          <div className="text-xs font-bold my-auto">
            Comments: {topic.comments.length}
          </div>
          {!isLiked ? (
            <button onClick={handleLike} className="text-xl ml-2">
              🤍
            </button>
          ) : (
            <button onClick={handleDisLike} className="text-xl ml-2">
              ❤️
            </button>
          )}
        </div>
      </div>
      {showComments && (
        <div className="mt-4 max-h-[200px] overflow-y-auto">
          {topic.comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-2 flex flex-row justify-between"
            >
              <div>
                <p className="font-semibold">{comment.authorName}</p>
                {editingCommentId === comment.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedCommentContent}
                      onChange={(e) => setEditedCommentContent(e.target.value)}
                      className="border border-gray-300 rounded-md p-1"
                    />
                    <div>
                      <button
                        onClick={() => handleSaveClick(comment.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-red-600 hover:underline ml-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{comment.content}</p>
                    <p>
                      Like:{' '}
                      {!comment?.isLikedByUser ? (
                        <button onClick={() => handleLikeComment(comment?.id)}>
                          🤍
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDisLikeComment(comment?.id)}
                        >
                          ❤️
                        </button>
                      )}
                    </p>
                  </div>
                )}
              </div>
              {comment?.isAuthoredByUser && (
                <div>
                  {editingCommentId !== comment.id && (
                    <button
                      onClick={() => handleEditClick(comment)}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-blue-600 hover:underline"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-medium">Add a Comment</h3>
        <input
          type="text"
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          className="border border-gray-300 rounded-md p-1 w-full mt-2"
          placeholder="Write your comment..."
        />
        <button
          onClick={handleAddComment}
          className="mt-2 text-blue-600 hover:underline"
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OneTopicCard;
