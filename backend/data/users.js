import bcrypt from 'bcryptjs';


const users = [
  {
    name: 'Admin Cookie',
    email: 'cookie@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Nye',
    email: 'nye@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Riah',
    email: 'riah@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users