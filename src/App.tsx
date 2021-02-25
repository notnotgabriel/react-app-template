import { hot } from 'react-hot-loader/root';
import UserCard from './components/UserCard/UserCard';

const App = () => (
  <>
    <p>App</p>
    <UserCard id={1} />
  </>
);

export default hot(App);
