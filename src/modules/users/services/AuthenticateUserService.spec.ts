import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository
    );

    const createUser = new CreateUserService(
      fakeUsersRepository
    );

    await createUser.execute({
      name: 'Someone',
      email: 'someone@example.com',
      password: 'test123'
    });

    const response = await authenticateUser.execute({
      email: 'someone@example.com',
      password: 'test123'
    });

    expect(response).toHaveProperty('token');
  });

  it('should be not able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository
    );

    const createUser = new CreateUserService(
      fakeUsersRepository
    );

    await createUser.execute({
      name: 'Someone',
      email: 'someone@example.com',
      password: 'test123'
    });

    const response = await authenticateUser.execute({
      email: 'someone@example.com',
      password: 'test123'
    });

    expect(response).toHaveProperty('token');
  });


});
