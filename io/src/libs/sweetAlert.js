import Swal from 'sweetalert2';

export function notAvailable(){
    Swal.fire({
        icon: 'error',
        title: 'Lo sentimos...',
        text: 'El algoritmo no está disponible',
      })
}