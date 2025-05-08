import {AppDataSource} from "./data-source"
import {User} from "./database/entities";

const userRepository = AppDataSource.getRepository(User);
AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...");
    if (!await userRepository.exists({where: {email: "admin@gmail.com"}})) {
        await userRepository.save(new User({
            email: "admin@gmail.com",
            password: "123456",
            name: "admin"
        }))
    }
    console.log("Here you can setup and run express / fastify / any other framework.");

}).catch(error => console.log(error))
