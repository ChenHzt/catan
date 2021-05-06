export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      console.log(user);

      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }