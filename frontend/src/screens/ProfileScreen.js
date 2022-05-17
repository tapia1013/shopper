import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

// action
import { getUserDetails } from '../actions/userActions'


const ProfileScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails)
  const { user, loading, error } = userDetails

  // userlogin to see if user is logged in
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      // check for user
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, navigate, dispatch, user])



  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // Dispatch update profile
    }
  }



  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>

        {message && (<Message variant='danger'>{message}</Message>)}

        {error && (<Message variant='danger'>{error}</Message>)}

        {loading && (<Loader />)}

        <Form onSubmit={submitHandler}>
          <Form.Group className='py-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder='Enter Name'
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='py-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              placeholder='Enter Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='py-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder='Enter password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='py-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen