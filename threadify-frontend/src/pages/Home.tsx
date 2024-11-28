import TopicCard from '../components/TopicCard';

const Home = () => {
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
        <TopicCard />
      </div>
    </div>
  );
};
export default Home;
