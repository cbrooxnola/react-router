import { useState, useEffect } from 'react'
import axios from 'axios';
import {Link, useLocation, Routes, Route } from 'react-router-dom';

const Home = () => {
  return ( <h1>HOME</h1> );
};

const Posts = ({ posts }) => {
  return (
  <div>
    <h1>POSTS</h1>
    <ul>
    {
      posts.map( post => {
        return (
          <li key={ post.id }>
            { post.name }
          </li>
        );
      })
    }
    </ul>
  </div>
  );
}

const Users = ({ users }) => {
  return (
  <div>
    <h1>USERS</h1>
    <ul>
    {
      users.map( user => {
        return (
          <li key={ user.id }>
            { user.name }
          </li>
        );
      })
    }
    </ul>
  </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await axios.get('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/posts');
      const data = response.data;
      setPosts(data.data);
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    const fetchUsers = async() => {
      const response = await axios.get('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users');
      const data = response.data;
      setUsers(data.data);
    }
    fetchUsers();
  }, [])

  return (
    <>
    <nav>
      <Link to='/' className={ pathname === '/' ? 'selected': ''}>HOME</Link>
      <Link to='/posts' className={ pathname === '/posts' ? 'selected': ''}>Posts ({ posts.length })</Link>
      <Link to='/users' className={ pathname === '/users' ? 'selected': ''}>Users ({ users.length })</Link>
    </nav>

    {/* <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/posts' element={ <Posts posts={ posts }/> } />
      <Route path='users' element={ <Users users={ users } /> } />
    </Routes> */}
      
    </>
  )
}

export default App
