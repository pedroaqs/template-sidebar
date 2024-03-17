import request from '@/utils/request'

/**
 * Actualiza una propiedad específica de un modelo por su ID.
 * 
 * @param {string} path - El camino de la API para acceder al recurso específico. Ejemplo: 'usuarios'.
 * @param {number|string} id - El ID del modelo a actualizar.
 * @param {string} propertyName - El nombre de la propiedad del modelo que se va a actualizar.
 * @param {any} value - El nuevo valor para la propiedad especificada.
 * @returns {Promise} Una promesa que resuelve con la respuesta de la solicitud de actualización.
 * 
 * @example
 * updateModelPropertyById('usuarios', 1, 'nombre', 'Juan Pérez')
 *   .then(response => {
 *     console.log('Actualización exitosa', response);
 *   })
 *   .catch(error => {
 *     console.error('Error al actualizar', error);
 *   });
 */
export const updateModelPropertyById  = (path,id,propertyName, value) => {
    return request({
      url: '/' + path,
      method: 'post',
      data: {id,propertyName, value}
    })
}


