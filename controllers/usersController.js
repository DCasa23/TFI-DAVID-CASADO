const Usuario = require("../models/user");


//GET de la Lista de Usuarios en el Sistema
exports.users = async (req, res) => {
    try {
        const arrayUsuarios = await Usuario.find();
        res.render("users", { title: "Lista de usuarios", arrayUsuarios: arrayUsuarios, usuario: req.session.cuenta });
    } catch (error) {
        console.log(error);
    }

};

//Get para Editar el Perfil del Usuario
exports.users_edit_get = async (req, res) => {
    const id = req.params.id;
    try {
        const usuarioEditar = await Usuario.findById(id);
        res.render("edituser", { tituloWeb: "Editar usuario", usuarioEditar: usuarioEditar });
    } catch (error) {
        console.log(error);
    }
};


//Put para Cambiar o Editar el Usuario
exports.users_edit_put = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    try {
        if (body.nombre != "" && body.nombreReal != "" && body.password != "" && body.apellidos != "") {
            const usuarioEditar = await Usuario.findByIdAndUpdate(
                id, body, { useFindAndModify: false }
            );
            res.json({
                estado: true,
                mensaje: 'Usuario editado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'Problema al editar el usuario'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el usuario'
        })
    }
};

//DELETE USUARIO ELIMINADO
exports.users_edit_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const usuarioBorrar = await Usuario.findByIdAndDelete(id);
        if (usuarioBorrar) {
            res.json({
                estado: true,
                mensaje: "Usuario eliminado correctamente"
            });
        } else {
            res.json({
                estado: false,
                mensaje: "Problema al eliminar el usuario"
            });
        }
    } catch (error) {
        console.log(error);
    }
};