import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TopicCard from '../components/TopicCard';
import UserCard from '../components/UserCard';
import { getAllTopics, getHotTopics } from '../api/topicApi';
import { getUsersWithTopComments } from '../api/userApi';
import { Topic } from '../interfaces/TopicInterface';
import { UserInfo } from '../interfaces/UserInterface';

const Home = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [hotTopics, setHotTopics] = useState<Topic[]>([]);
  const [topUsers, setTopUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchAllTopics = async () => {
    try {
      const allTopics = await getAllTopics(1);
      setTopics(allTopics);
    } catch (error) {
      setError('Failed to fetch all topics');
    }
  };

  const fetchHotTopics = async () => {
    try {
      const hotTopics = await getHotTopics();
      setHotTopics(hotTopics);
    } catch (error) {
      setError('Failed to fetch hot topics');
    }
  };

  const fetchTopUsers = async () => {
    try {
      const topUsers = await getUsersWithTopComments();
      setTopUsers(topUsers);
    } catch (error) {
      setError('Failed to fetch top users');
    }
  };

  const loadMoreTopics = async () => {
    setLoadingMore(true);
    try {
      const moreTopics = await getAllTopics(page + 1);
      setTopics((prevTopics) => {
        const newTopics = moreTopics.filter(
          (newTopic) =>
            !prevTopics.some((prevTopic) => prevTopic.id === newTopic.id),
        );
        return [...prevTopics, ...newTopics];
      });
      setPage(page + 1);
    } catch (error) {
      setError('Failed to load more topics');
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchApis = async () => {
      try {
        await Promise.all([
          fetchAllTopics(),
          fetchHotTopics(),
          fetchTopUsers(),
        ]);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mx-auto mt-4">
      <div>
        <p className="text-center text-xl font-medium mb-2">Hot Topics</p>
        {hotTopics &&
          hotTopics.map((hotTopic, index) => (
            <motion.div
              key={hotTopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TopicCard
                topic={hotTopic}
                refetchTopics={fetchAllTopics}
                refetchHotTopics={fetchHotTopics}
              />
            </motion.div>
          ))}
      </div>
      <div>
        <p className="text-center text-xl font-medium mb-2">
          Users with most comments
        </p>
        {topUsers &&
          topUsers.map((topUser, index) => (
            <motion.div
              key={topUser.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <UserCard user={topUser} />
            </motion.div>
          ))}
      </div>
      <div>
        <p className="text-center text-xl font-medium mb-2">All Topics</p>
        {topics &&
          topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TopicCard
                topic={topic}
                refetchTopics={fetchAllTopics}
                refetchHotTopics={fetchHotTopics}
              />
            </motion.div>
          ))}
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreTopics}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
