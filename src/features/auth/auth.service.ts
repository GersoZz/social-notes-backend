import bcrypt from 'bcryptjs'
import UserModel from 'src/features/users/models/User.model'
import { createAccessToken } from 'src/libs/jwt'

interface userSignUp {
  username: string
  email: string
  password: string
}

interface userSignIn {
  email: string
  password: string
}

export const signUp = async ({ username, email, password }: userSignUp): Promise<any> => {
  const userFound = await UserModel.findOne({ email })

  if (userFound)
    throw {
      status: 400,
      success: false,
      message: 'The email is already in use'
    }

  // hashing the password
  const passwordHash = await bcrypt.hash(password, 10)

  // creating the user
  const newUser = new UserModel({
    username,
    email,
    password: passwordHash
  })

  // saving the user in the database
  const userSaved = await newUser.save()

  // create access token
  const token: string = await createAccessToken({ id: userSaved._id })

  return {
    token,
    userData: {
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email
    }
  }
}

export const signIn = async ({ email, password }: userSignIn): Promise<any> => {
  const userFound = await UserModel.findOne({ email })

  if (!userFound)
    throw {
      status: 400,
      success: false,
      message: 'The email does not exist'
    }

  const isMatch = await bcrypt.compare(password, userFound.password)
  if (!isMatch)
    throw {
      status: 400,
      success: false,
      message: 'The password is incorrect'
    }

  const token = await createAccessToken({
    id: userFound._id,
    username: userFound.username
  })

  return {
    token,
    data: {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    }
  }
}

export const findUserById = async (id: string): Promise<any> => {
  const userFound = await UserModel.findById(id)

  if (!userFound)
    throw {
      status: 400,
      success: false,
      message: 'The id does not exist'
    }

  return {
    id: userFound._id,
    username: userFound.username,
    email: userFound.email
  }
}
