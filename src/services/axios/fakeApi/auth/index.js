import mock from '../mock'

const fakeJwt = {
  sign: id => {
    return `${id}.366be641c17cb6d9c5d8944e00bfce3189d8b1515a`
  },
  verify: token => {
    return Number(token.split('.')[0])
  },
}

const adminAbility = [
  {
    action: 'manage',
    subject: 'all',
  },
]

const userAbility = [
  {
    action: 'manage',
    subject: 'Dashboard',
  },
  {
    action: 'manage',
    subject: 'Apps',
  },
  {
    action: 'manage',
    subject: 'Ecommerce',
  },
  {
    action: 'read',
    subject: 'Auth',
  },
]

const users = [
  {
    id: 1,
    email: 'demo@visualbuilder.cloud',
    password: 'VisualBuilder',
    name: 'Tom Jones',
    avatar: '',
    role: 'admin',
    ability: adminAbility,
  },
  {
    id: 2,
    email: 'demo@visualbuilder.user',
    password: 'VisualBuilder',
    name: 'Sadeena',
    avatar: '',
    role: 'user',
    ability: userAbility,
  },
]

const jwtConfig = {
  secret: 'RM8EPpgXwovR9fp6ryDIoGHAB6iHsc0fb',
  expiresIn: 1 * 24 * 60 * 60 * 1000,
}

mock.onPost('/api/auth/login').reply(request => {
  const { email, password } = JSON.parse(request.data)
  const user = users.find(item => item.email === email && item.password === password)
  const error = user ? 'Something went wrong.' : 'Login failed, please try again'

  if (user) {
    const userData = Object.assign({}, user)
    delete userData.password
    userData.accessToken = fakeJwt.sign(userData.id) // generate jwt token

    return [200, userData]
  }

  return [401, error]
})

mock.onGet('/api/auth/account').reply(request => {
  const { AccessToken } = request.headers
  if (AccessToken) {
    const id = fakeJwt.verify(AccessToken)
    const userData = Object.assign(
      {},
      users.find(item => item.id === id),
    )
    delete userData.password
    userData.accessToken = fakeJwt.sign(userData.id) // refresh jwt token

    return [200, userData]
  }

  return [401]
})

mock.onPost('/api/auth/register').reply(request => {
  const { email, password, name } = JSON.parse(request.data)
  const isAlreadyRegistered = users.find(user => user.email === email)

  if (!isAlreadyRegistered) {
    const user = {
      id: users.length + 1,
      email,
      password,
      name,
      avatar: '',
      role: 'admin',
      ability: adminAbility,
    }
    users.push(user)

    const userData = Object.assign({}, user)
    delete userData.password
    userData.accessToken = fakeJwt.sign(users.length)

    return [200, userData]
  }

  return [401, 'This email is already in use.']
})

mock.onGet('/api/auth/logout').reply(() => {
  return [200]
})
