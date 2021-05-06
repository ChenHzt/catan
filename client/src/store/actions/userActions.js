export const setCurrentUser = user => {
    return {
      type: 'CURRENT_USER',
      payload: user
    };
  };