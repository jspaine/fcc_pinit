import User from '~/api/user/model'

export default async (clear) => {
  if (clear) await clearAll()
  await seedUsers()
}

async function clearUsers() { await User.find({}).remove() }

async function clearAll() {
  await clearUsers()
}

async function seedUsers() {
  const users = await User.count()

  if (users) return
  const user1 = await User.create({
    username: 'test',
    password: '1234',
    provider: 'local',
    image: 'http://placeimg.com/64/64/animals',
    links: [
      {url: 'http://placeimg.com/64/64/tech', description: 'something'}
    ]
  })
  await User.create({
    username: 'another',
    password: '1234',
    provider: 'local',
    image: 'http://placeimg.com/64/64/tech',
    links: [
      {
        url: 'http://placeimg.com/64/64/tech',
        description: 'something',
        stars: [
          {user: user1._id}
        ]
      },
      {url: 'http://placeimg.com/64/64/people', description: 'blah'}
    ]
  }, {
    username: 'admin',
    password: '1234',
    role: 'admin',
    provider: 'local',
    image: 'http://placeimg.com/64/64/people'
  })
}
