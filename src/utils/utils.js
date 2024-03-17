export const convertirAFormData = (objeto, formData = null, clavePadre = '') => {
  if (formData === null) {
    formData = new FormData();
  }

  for (const key in objeto) {
    // eslint-disable-next-line no-prototype-builtins
    if (objeto.hasOwnProperty(key)) {
      const claveActual = clavePadre === '' ? key : `${clavePadre}[${key}]`;

      if (Array.isArray(objeto[key])) {
        // Si es un array, iterar sobre sus elementos
        objeto[key].forEach((element, index) => {
          convertirAFormData({ [index]: element }, formData, claveActual);
        });
      } else if (objeto[key] instanceof File) {
        // Si es un archivo, agregar al FormData sin procesar
        formData.append(claveActual, objeto[key]);
      } else if (objeto[key] instanceof Date) {
        // Si es un objeto Date, convertir a su representación ISO y agregar al FormData
        formData.append(claveActual, objeto[key].toISOString());
      } else if (typeof objeto[key] === 'object' && objeto[key] !== null) {
        // Si es un objeto, llamar recursivamente para manejar objetos anidados
        convertirAFormData(objeto[key], formData, claveActual);
      } else {
        // Para otros tipos de datos, agregar al FormData
        formData.append(claveActual, objeto[key] === null? null:objeto[key]);
      }
    }
  }

  return formData;
};


export const esObjetoNoVacio = (obj) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
}