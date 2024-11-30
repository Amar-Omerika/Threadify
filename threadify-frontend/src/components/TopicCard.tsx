import { useState } from 'react';
import {
  likeTopic,
  disLikeTopic,
  deleteTopic,
  updateTopic,
} from '../api/topicApi';
import { Topic } from '../interfaces/TopicInterface';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from './Modals/DeleteModal';
import EditTopicModal from './Modals/EditTopicModal';
import avatarSvg from '../assets/avatar.svg';
interface TopicCardProps {
  topic: Topic;
  refetchTopics: () => void;
  refetchHotTopics: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  refetchTopics,
  refetchHotTopics,
}) => {
  const [isLiked, setIsLiked] = useState(topic.isLikedByUser);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
      await likeTopic(topic.id);
      refetchTopics();
      refetchHotTopics();
    } catch (error) {
      toast.error('Updating failed, try again');
    }
  };

  const handleDisLike = async () => {
    setIsLiked(!isLiked);
    try {
      await disLikeTopic(topic.id);
      refetchTopics();
      refetchHotTopics();
    } catch (error) {
      toast.error('Updating failed, try again');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTopic(topic.id);
      toast.success('Topic deleted successfully');
      setShowDeleteModal(false);
      refetchTopics();
      refetchHotTopics();
    } catch (error) {
      toast.error('Deleting topic failed, try again');
    }
  };

  const handleSaveTopic = async (title: string, description: string) => {
    try {
      await updateTopic(topic.id, { title, description });
      // toast.success('You successfully updated the topic...');
      refetchTopics();
      refetchHotTopics();
    } catch (error) {
      toast.error('Updating topic failed, try again');
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

        <div className="flex flex-row justify-between w-full">
          <h5 className="font-medium ml-2">Author: {topic?.authorName}</h5>
          {topic?.isAuthoredByUser && (
            <div>
              <button
                onClick={() => setShowEditModal(true)}
                className="text-blue-600 hover:underline"
              >
                ✏️
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-blue-600 hover:underline ml-2"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
      <a>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {topic?.title || 'Untitled'}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {topic?.description}
      </p>
      <div className="flex flex-row justify-between">
        <Link
          to={`/topic/${topic?.id}`}
          className="inline-flex font-medium items-center text-blue-600 hover:underline"
        >
          See details
          <svg
            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </Link>
        <div className="flex flex-row">
          <div className="text-xs font-bold my-auto">
            Comments: {topic?._count.comments}
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
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
      <EditTopicModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveTopic}
        initialTitle={topic.title}
        initialDescription={topic.description}
      />
      <ToastContainer />
    </div>
  );
};

export default TopicCard;
