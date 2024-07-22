import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Tallerista } from "@/interfaces/Tallerista";
import { Taller } from "@/interfaces/Taller";

// Se registra un tallerista
export const registrarTallerista = async (tallerista: Tallerista) => {
    const docRef = await addDoc(collection(db, "Talleristas"), tallerista);
}

// Se recuperan todos los talleristas
export const recuperarTalleristas = async () => {
    // Se recuperan todos los talleristas
    const talleristasColRef = collection(db, "Talleristas");
    const talleristasSnapshot = await getDocs(talleristasColRef);

    const talleristas: Tallerista[] = [];

    // Se crea una lista con los talleristas
    talleristasSnapshot.forEach((doc) => {
        const tallerista: Tallerista = {
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            edad: doc.data().edad,
            correo: doc.data().correo,
            ocupacion: doc.data().ocupacion,
            biografia: doc.data().biografia,
        };
        talleristas.push(tallerista);
    });

    // Se recuperan todos los talleres
    const talleresColRef = collection(db, "talleres");
    const talleresSnapshot = await getDocs(talleresColRef);

    const talleresDeTallerista: { [key: string]: number } = {};

    talleresSnapshot.forEach((doc) => {
        const taller: Taller = {
            titulo: doc.data().titulo,
            tematica: doc.data().tematica,
            fecha_inicio: doc.data().fecha_inicio,
            fecha_termino: doc.data().fecha_termino,
            tallerista: doc.data().tallerista,
            cuposDisponibles: doc.data().cuposDisponibles,
            descripcion: doc.data().descripcion,
            key: doc.id,
        };

        if (!talleresDeTallerista[taller.tallerista]) {
            talleresDeTallerista[taller.tallerista] = 0;
        }
        talleresDeTallerista[taller.tallerista] += 1;
    });
    return talleristas;
}

// Se actualizan los datos de un tallerista
export const actualizarTallerista = async (tallerista: Tallerista) => {  
    const ref = doc(db, "Talleristas", tallerista.nombre!);
    await updateDoc(ref, { ...tallerista });
}

// Se eliminan los datos de un tallerista
export const eliminarTallerista = async (tallerista: Tallerista) => {
    const ref = doc(db, "Talleristas", tallerista.nombre!);
    await deleteDoc(ref);
}

// Se registra un taller
export const registrarTaller = async (taller: Taller) => {
    const docRef = await addDoc(collection(db, "talleres"), taller);
}

// Se recuperan los talleres registrados
export const recuperarTalleres = async () => {
    const talleresColRef = collection(db, "talleres");
    const talleresSnapshot = await getDocs(talleresColRef);

    const talleres: Taller[] = [];
    talleresSnapshot.forEach((doc) => {
        const taller: Taller = {
            titulo: doc.data().titulo,
            tematica: doc.data().tematica,
            fecha_inicio: doc.data().fecha_inicio,
            fecha_termino: doc.data().fecha_termino,
            tallerista: doc.data().tallerista,
            cuposDisponibles: doc.data().cuposDisponibles,
            descripcion: doc.data().descripcion,
            key: doc.id,
        };
        talleres.push(taller);
    });
    return talleres;
}

// Se actualizan los datos de un taller
export const actualizarTaller = async (taller: Taller) => {  
    const ref = doc(db, "talleres", taller.key!);
    await updateDoc(ref, { ...taller });
}

// Se eliminan los datos de un taller
export const eliminarTaller = async (key: string) => {
    await deleteDoc(doc(db, "talleres", key));
}
