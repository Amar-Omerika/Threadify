import { useEffect, useState } from 'react';
import TopicCard from '../components/TopicCard';
import UserCard from '../components/UserCard';
import { getAllTopics, getHotTopics } from '../api/topicApi';
import { getUsersWithTopComments } from '../api/userApi';
import { Topic } from '../interfaces/TopicInterface';
import { UserInfo } from '../interfaces/UserInterface';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [hotTopics, setHotTopics] = useState<Topic[]>([]);
  const [topUsers, setTopUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllTopics = async () => {
    try {
      const allTopics = await getAllTopics();
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
    <ErrorBoundary>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mx-auto mt-4">
        <div>
          <p className="text-center text-xl font-medium mb-2">Hot Topics</p>
          {hotTopics &&
            hotTopics.map((hotTopic) => (
              <div key={hotTopic.id}>
                <TopicCard
                  topic={hotTopic}
                  refetchTopics={fetchAllTopics}
                  refetchHotTopics={fetchHotTopics}
                />
              </div>
            ))}
        </div>
        <div>
          <p className="text-center text-xl font-medium mb-2">
            Users with most comments
          </p>
          {topUsers &&
            topUsers.map((topUser) => (
              <div key={topUser.id}>
                <UserCard user={topUser} />
              </div>
            ))}
        </div>
        <div>
          <p className="text-center text-xl font-medium mb-2">All Topics</p>
          {topics &&
            topics.map((topic) => (
              <div key={topic.id}>
                <TopicCard
                  topic={topic}
                  refetchTopics={fetchAllTopics}
                  refetchHotTopics={fetchHotTopics}
                />
              </div>
            ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
