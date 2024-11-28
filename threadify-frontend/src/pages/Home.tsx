import { useEffect, useState } from 'react';
import TopicCard from '../components/TopicCard';
import { getAllTopics } from '../api/topicApi';
import { Topic } from '../interfaces/TopicInterface';

const Home = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getAllTopics();
        setTopics(data);
      } catch (error) {
        setError('Failed to fetch topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
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
        <TopicCard />
      </div>
      <div>
        <p className="text-center text-xl font-medium mb-2">
          Users with most comments
        </p>
        <TopicCard />
      </div>
      <div>
        <p className="text-center text-xl font-medium mb-2">All topics</p>
        {topics &&
          topics.map((topic) => (
            <div key={topic.id}>
              <TopicCard topic={topic} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Home;
