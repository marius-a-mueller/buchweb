import { useParams } from 'react-router-dom';

const Home = () => {
  const params = useParams();
  return (
    <div>
      <h1>Home</h1>
      <h2>{params.bookId}</h2>
    </div>
  );
};

export { Home };
