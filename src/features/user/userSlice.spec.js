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
      password: 'abcd@Test$1234'
    }));
    expect(actual.user).toEqual({
      username: 'James',
      password: 'abcd@Test$1234'
    });
  });

  it('should handle logout', () => {
    const actual = userReducer(initialState, logout());
    expect(actual.user).toEqual(null);
  });
});
