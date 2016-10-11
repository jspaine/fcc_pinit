import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import thenifyAll from 'thenify-all'

const crypt = thenifyAll(bcrypt, {}, ['hash', 'compare'])

const {Schema} = mongoose
const authProviders = ['github', 'google']

const LinkSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  description: String,
  stars: [
    {
      user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
      }
    }
  ]
}, {
  timestamps: true
})

export const UserSchema = new Schema({
  username: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    select: false,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    default: 'local'
  },
  github: {},
  google: {},
  links: [LinkSchema]
}, {
  timestamps: true
})

UserSchema.pre('save', async function(next) {
  if (authProviders.find(p => p === this.provider)) return next()
  if (this.isModified('password') || this.isNew && this.role !== 'guest') {
    const hash = await crypt.hash(this.password, 10)
    this.password = hash
  }
  next()
})

UserSchema.method('authenticate', async function(password) {
  return await crypt.compare(password, this.password)
})

export default mongoose.model('User', UserSchema)
