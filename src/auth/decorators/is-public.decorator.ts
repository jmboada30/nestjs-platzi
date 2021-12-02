import { SetMetadata } from '@nestjs/common';

// Texto que nos indica que una ruta es publica (osea que ignora los guards)
export const IS_PUBLIC_KEY = 'isPublic';

// Decorador personalizado, si el true lo cambiamos a false todo se bloquea (ya nada sera publico)
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

// Nota:
// QUE FACIL ES CREAR UN DECORADOR... AL PARECER SOLO ES UNA FUNCION DE FLECHA EXPORTADA COMO UNA VARIABLE.
