
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();



router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const server = Server.getInstance();
    const payload = { de, cuerpo }
    server.io.emit('mensajes-nuevos',payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;
    const server = Server.getInstance();
    const payload = { 
        de,
        cuerpo
    }
    server.io.in(id).emit('mensaje-privado',payload);

    
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});

// servicio para obtener todos los ID de los usuarios.


router.get('/usuarios', ( req: Request, res: Response  ) => {
    const server =  Server.getInstance();
    server.io.clients(( _err , clientes: string[]) =>{ 
        if( _err){
            res.json({
                ok: false,
                _err
            });
        }

        res.json({
            ok: true,
            mensaje: 'Todo esta bien!! Get usuarios.',
            clientes
        });

    });
  

});

//obtener usuarios y nombres

router.get('/usuarios/detalle', ( req: Request, res: Response  ) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!! Get usuarios.',
        clientes: usuariosConectados.getLista()
    });
});



export default router;


