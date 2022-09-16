import { IsEmail, IsString } from "class-validator";

export class User {
   public _id: string;
    public email: string;
    public name: string;
}