import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly type: string;
    
    @IsString()
    readonly access_token: string;

    @IsString()
    readonly refresh_token: string;
}