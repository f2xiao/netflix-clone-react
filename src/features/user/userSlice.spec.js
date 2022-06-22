import userReducer, {
  login,logout
} from './userSlice';

describe('user reducer', () => {
  const initialState = {
    user: null
  };
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      user:null
    });
  });

  it('should handle login', () => {
    const actual = userReducer(initialState, login({
      username: 'James',
      uid: 'sadsjahdaskda'
    }));
    expect(actual.user).toEqual({
      username: 'James',
      uid: 'sadsjahdaskda'
    });
  });

  it('should handle logout', () => {
    const actual = userReducer(initialState, logout());
    expect(actual.user).toEqual(null);
  });
});
