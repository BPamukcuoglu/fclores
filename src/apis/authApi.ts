import createResourceId from '../utils/createResourceId';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import wait from '../utils/wait';
import { User } from '../types/user';
import axios from 'axios';

const users = JSON.parse(window.localStorage.getItem("users")) || [];

class AuthApi {
  async login({ email, password }): Promise<string> {
    const user = await axios.post('http://localhost:3000/auth/signin', { userName: email, password })
      .then((resp) => (resp.data))
      .catch((error) => (null))

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        if (user) {
          users.push(user)
          window.localStorage.setItem("users", JSON.stringify(users))
          const accessToken = sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
          );
          resolve(accessToken);
        } else {
          reject(new Error('Please check your email and password'));
        }
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async register({ email, name, password }): Promise<string> {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find((_user) => _user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: null,
          email,
          name: user.userame,
          password,
        };

        users.push(user);

        const accessToken = sign(
          { userId: user.id },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(accessToken): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const { userId } = decode(accessToken) as any;

        // Find the user
        const user = users.find((_user) => _user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.username,
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
