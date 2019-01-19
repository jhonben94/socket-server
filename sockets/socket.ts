import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();


export const desconectar = ( cliente: Socket, io: socketIO.Server)=>{

    cliente.on('disconnect',()=>{
        usuariosConectados.borrarUsuario( cliente.id );
        io.emit('usuarios-activos', usuariosConectados.getLista() );
        console.log('Cliente desconectado');
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) =>{
    cliente.on('mensaje',(paylod)=>{
        console.log('Mensaje Recibido',paylod);
        io.emit('mensajes-nuevos',paylod);
    });
};

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
   
    cliente.on('configurar-usuario', (payload , callback: Function)=>{
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        io.emit('usuarios-activos', usuariosConectados.getLista() );
        callback({
            ok:true,
            mensaje:`Usuario ${payload.nombre}, configurado`
        });
    });

}
export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
        const usuario =new Usuario( cliente.id);
        usuariosConectados.agregar(usuario);
    }

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
        cliente.on('obtener-usuarios', (n)=>{

            io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista() );
            
        });
    }
