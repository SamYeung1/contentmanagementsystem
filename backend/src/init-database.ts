import { AppDataSource } from './data-source';
import { UserEntity } from './database/entities';

const userRepository = AppDataSource.getRepository(UserEntity);
AppDataSource.initialize().then(async () => {

  console.log('Inserting a new user into the database...');
  if (!await userRepository.exists({ where: { email: '(admin)@gmail.com' } })) {
    await userRepository.save(new UserEntity({
      email: '(admin)@gmail.com',
      password: '123456',
      name: 'admin',
      isRootUser: true,
    }));
  }
  console.log('Here you can setup and run express / fastify / any other framework.');

}).catch(error => console.log(error));
