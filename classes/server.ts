
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

    private static _instance:Server;

    public app: express.Application;
    public port: number;
    public io : socketIO.Server;
    private httpServer : http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSocket();
    }
    public static getInstance(){
        return this._instance || (this._instance = new Server() );
    }

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback );

    }

    private escucharSocket (){
        this.io.on('connection', cliente =>{
            //console.log(cliente.id)
            // conectar cliente 
            socket.conectarCliente(cliente, this.io);
            // #1 Config usuario.
            socket.desconectar( cliente, this.io );
            socket.mensaje(cliente, this.io );
            socket.configurarUsuario(cliente, this.io );
            socket.obtenerUsuarios(cliente, this.io );
        })
   
    }

}