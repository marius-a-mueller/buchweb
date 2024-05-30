import { useParams } from 'react-router-dom';

const Home = () => {
  const props = useParams();
  return (
    <div>
      <h1>Home</h1>
      <h2>{props.bookId}</h2>
    </div>
  );
};

export { Home };
