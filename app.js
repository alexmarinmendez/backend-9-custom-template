const express = require('express')
const fs = require('fs')
const app = express()
const server = app.listen(8080, () => console.log('Server Up'))

app.engine('cdr', (filepath, obj, callback) => {
    fs.readFile(filepath, (err, data) => {
        if (err) return callback(new Error(err))
        const template = data.toString()
            .replace('^^titulo$$', ''+obj.titulo)
            .replace('^^mensaje$$', ''+obj.mensaje)
            .replace('^^autor$$', ''+obj.autor)
            .replace('^^version$$', ''+obj.version)
        return callback(null, template)
    })
})

app.set('views', './views')
app.set('view engine', 'cdr')

app.get('/', (req, res) => {
    res.render('Bienvenida', {
        titulo: '(algún título en string)',
        mensaje: '(algún mensaje en string)',
        autor: '(algun autor en string)',
        version: 23
    })
})
