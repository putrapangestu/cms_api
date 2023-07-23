import User from "../../model/entity/User";
import {CreateUserDTO} from "../../model/dto/request/CreateUserDTO";
import UserRepositoryImpl from "../../repository/impl/UserRepositoryImpl";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export class UserHandler {

  /**
   * createUserHandler
   *
   * This function will handle User Creation.
   *
   * @param email
   * @param phone
   */
  public createUserHandler = async (
    email: string,
    phone: string
  ): Promise<User> => {
    const dto: CreateUserDTO = {
      "email": email,
      "phone": phone
    };

    const newUser: User = await UserRepositoryImpl.createUser(dto);

    return newUser;
  }

  /**
   * getUserByIdHandler
   *
   * This function will handle finding user by its ID.
   *
   * @param id
   */
  public getUserByIdHandler = async (id: number): Promise<User> => {
    const user: User = await UserRepositoryImpl.findUserById(id);

    return user;
  }

  public loginUser = async (
    email: string,
    password: string
  ): Promise<any> => {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (!user) {
        throw new Error("Akun tidak ditemukan");
      }
  
      const passwordIsValid = bcrypt.compareSync(password, user.password ?? '');
  
      if (!passwordIsValid) {
        throw new Error("Password salah");
      }

      const token = jwt.sign({ id: user.id }, "your_secret_key" , {
        expiresIn: '1h',
      });
  
      return {user, token};
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  };

  public registerUser = async(
    name: string,
    email: string,
    phone: string,
    password: string
    ): Promise<User> => {
      try {
      let selectUser = await User.findOne({
        where: {
          email: email
        }
      })
  
      if(selectUser)
      {
        throw new Error("Alamat email sudah digunakan")
      }
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const data = User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: "user"
      })      
      
      return data;
    } catch (error: any) {
        throw new Error(`Error: ${error.message}`)   
    }
  }
}