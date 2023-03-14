import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly type: string;
    
    @IsString()
    readonly accessToken: string;

    @IsString()
    readonly refreshToken: string;
}