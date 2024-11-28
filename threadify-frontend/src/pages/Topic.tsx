import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OneTopicCard from '../components/OneTopicCard';
import { getOneTopic } from '../api/topicApi';
import { Topic as TopicInterface } from '../interfaces/TopicInterface';

const Topic = () => {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<TopicInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const data = await getOneTopic(Number(id));
        setTopic(data);
      } catch (error) {
        setError('Failed to fetch topic');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {topic && (
        <div className="flex flex-col justify-center items-center mt-4">
          <h1 className="font-bold text-2xl">Current Topic</h1>
          <OneTopicCard topic={topic} />
        </div>
      )}
    </div>
  );
};

export default Topic;
