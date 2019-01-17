import { Usuario } from './usuario';
export class UsuarioLista {
    public lista: Usuario[] =[];
    constructor (){

    }
    // Se agrega un usuario
    public agregar( usuario: Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    public actualizarNombre( id: string, nombre: string){
       for(let usuario of this.lista) {
           if (usuario.id === id) {
               usuario.nombre = nombre;
               break;
           }
       }

       console.log('===== Actualizando Usuario =====');
       console.log(this.lista);
    }

    public getLista(){
        return this.lista;
    }

    public getUsuario (id: string) {
        this.lista.find( usuario => usuario.id === id );   
    }

    public getUsuariosEnSala (sala: string){
        this.lista.filter( usuario => usuario.sala ===sala );
    }

    public borrarUsuario (id: string){
        const tempUsuario = this.getUsuario(id);
        this.lista =this.lista.filter( usuario => usuario.id !== id);

        return tempUsuario;
    }
}