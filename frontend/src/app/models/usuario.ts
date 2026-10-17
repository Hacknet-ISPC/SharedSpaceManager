export interface Usuario {
    id?: string;
    id_usuario?: number;
    id_rol: number;
    nombre: string;
    apellido: string;
    username?: string;
    email: string;
    contraseña: string;
    fecha_registro: string;
}

export interface RegistroPayload {
  username?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegistroRespuesta {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginRespuesta {
  mensaje: string;
  usuario: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    rol: number;
    rol_nombre: string;
    date_joined: string;
  };
}