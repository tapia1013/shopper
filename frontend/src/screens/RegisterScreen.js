import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// action
import { register } from '../actions/userActions'


const RegisterScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister)
  const { userInfo, loading, error } = userRegister


  const redirect = location.search ? location.search.split('=')[1] : '/'


  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])


  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // dispatch register
      dispatch(register(name, email, password))
    }
  }



  return (
    <FormContainer>
      <h1>Sign Up</h1>

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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen