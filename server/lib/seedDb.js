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
    image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_2_normal.png',
    links: [
      {url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Very_Large_Telescope_Ready_for_Action_(wallpaper).jpg', description: 'something'}
    ]
  })
  await User.create({
    username: 'another',
    password: '1234',
    provider: 'local',
    image: 'https://pbs.twimg.com/profile_images/739825298133254144/KUU_6jj__normal.jpg',
    links: [
      {
        url: 'http://static.naturallycurly.com/wp-content/uploads/2014/05/OLIVE-oil-for-hair-650x365.jpg',
        description: 'oil',
        stars: [
          {user: user1._id}
        ]
      },
      {url: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-439045.jpg', description: 'blah'}
    ]
  }, {
    username: 'admin',
    password: '1234',
    role: 'admin',
    provider: 'local',
    image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_6_normal.png',
    links: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Hanoi_railroad_tracks.jpg',
        description: 'rail',
        stars: [
          {user: user1._id}
        ]
      }
    ]
  })
}
