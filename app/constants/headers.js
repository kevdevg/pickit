
const headers = {
  login_header : { 'Content-Type': 'application/json' },
  headers : (token=localStorage.getItem('token')) => (
    {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  ),
};


export default headers;
