const NOMBRE_CURSO = 'Cypress desde cero'
let contadorGlobal = 0

function registrarEstudiantes(nombre) {
    let mensaje = `Bienvenido ${nombre}, al curso: ${NOMBRE_CURSO}`
    let mensaje1 = 'Bienvenido ' + nombre + ', al curso: ' + NOMBRE_CURSO 
    console.log(mensaje)
    console.log(mensaje1)

    contadorGlobal++
}

registrarEstudiantes('Juan')
registrarEstudiantes('Ana')

console.log('Estudiantes registrados: ' + contadorGlobal)


