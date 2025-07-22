export interface IUser{
    id: number
    nombre: string,
    apellido: string,
    edad: number,
    rol: string
}

export interface IUser2{
    nombre: string,
    apellido: string,
    edad: number,
    pass: string,
    rol: string
}

export interface IUser3{
    id: number,
    nombre: string,
    apellido: string,
    edad: number,
    pass: string,
    rol: string
}


export interface ILogin{
    nombre: string,
    pass: string
}