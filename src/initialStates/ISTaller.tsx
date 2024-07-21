import { Taller } from "@/interfaces/Taller";


export const initialStateTaller: Taller = {
    titulo: '',
    tematica: '',
    fecha_inicio: new Date(),
    fecha_termino: new Date(),
    tallerista: '',
    cuposDisponibles: 0,
    descripcion: '',
}