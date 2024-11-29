import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TopicCard from '../components/TopicCard';
import { getUserTopics } from '../api/topicApi';
import { Topic } from '../interfaces/TopicInterface';
import ErrorBoundary from '../components/ErrorBoundary';

const MyTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserTopics = async () => {
    try {
      const userTopics = await getUserTopics();
      setTopics(userTopics);
    } catch (error) {
      setError('Failed to fetch user topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTopics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid mx-auto mt-4">
      <div>
        <p className="text-center text-xl font-medium mb-2">My Topics</p>
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
                refetchTopics={fetchUserTopics}
                refetchHotTopics={() => {}}
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default MyTopics;
