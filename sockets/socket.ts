import { Socket } from 'socket.io';
import socketIO from 'socket.io';


export const desconectar = ( cliente: Socket)=>{

    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) =>{
    cliente.on('mensaje',(paylod)=>{
        console.log('Mensaje Recibido',paylod);
        io.emit('mensajes-nuevos',paylod);
    });
};