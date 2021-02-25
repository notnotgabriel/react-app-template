import { FC } from 'react';
import { useFetchUserHook } from './fetchUserHook';

type UserCardProps = {
  id?: number | string;
};

const UserCard: FC<UserCardProps> = ({ id = 1 }) => {
  const { user, error, fetchUser } = useFetchUserHook({ id });
  const buttonText = user ? 'User fetched' : 'Fetch user';

  return (
    <div>
      <button type="button" onClick={fetchUser} disabled={!!user}>
        {buttonText}
      </button>
      {!error && user && (
        <>
          <p>Hello {user.name}</p>
          <p>User e-mail: {user.email}</p>
        </>
      )}
      {error && <p role="alert">Failed to fetch user</p>}
    </div>
  );
};

export default UserCard;
