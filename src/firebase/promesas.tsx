import { addDoc, collection, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Tallerista } from "@/interfaces/Tallerista";
import { Taller } from "@/interfaces/Taller";

// Acciones relacionadas a la base de datos con los datos de los talleristas
// Se registra un tallerista
export const registrarTallerista = async (tallerista: Tallerista) => {
    const docRef = await addDoc(collection(db, "Talleristas"), tallerista);
}

// Se muestran los talleristas registrados junto con el número de talleres
export const recuperarTalleristas = async () => {
    // Se recuperar todos los talleristas
    const talleristasColRef = collection(db, "Talleristas");
    const talleristasSnapshot = await getDocs(talleristasColRef);
    
    let talleristas: Tallerista[] = [];
    
    // Se crea un mapa para contar talleres por tallerista
    const talleristaCounts: { [key: string]: number } = {};
    
    // Se inicialza el mapa con los talleristas
    talleristasSnapshot.forEach((doc) => {
        const tallerista: Tallerista = {
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            edad: doc.data().edad,
            correo: doc.data().correo,
            ocupacion: doc.data().ocupacion,
            biografia: doc.data().biografia,
            numero_talleres: 0,
            key: doc.id,
        };
        // Se inicializar el contador de talleres
        talleristas.push(tallerista);
        talleristaCounts[doc.id] = 0; 
    });

    // Se recuperan todos los talleres
    const talleresColRef = collection(db, "talleres");
    const talleresSnapshot = await getDocs(talleresColRef);
    
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

        // Incrementar el contador de talleres del tallerista
        if (talleristaCounts[taller.tallerista]) {
            talleristaCounts[taller.tallerista]++;
        }
    });

    // Actualizar el número de talleres en cada tallerista
    talleristas = talleristas.map(tallerista => ({...tallerista, numero_talleres: talleristaCounts[tallerista.key!] || 0
    }));

    return talleristas;
}

    // Se actualizan los datos de un tallerista
export const eliminarTallerista = async (t: Tallerista) => {
    const ref = doc(db, "Talleristas", t.key!);
    await deleteDoc(ref);
};

// Acciones relacionadas a la base de datos con los datos de los talleres
    // Se registra un taller
export const registrarTaller = async (taller: Taller) => {
    const docRef = await addDoc(collection(db, "talleres"), taller);
}

    // Se recuperan los talleres registrados
export const recuperarTalleres = async () => {
    const docRef = collection(db, "talleres");
    const querySnapshot = await getDocs(docRef);

    let talleres: Taller[] = [];
    querySnapshot.forEach((doc) => {
        let taller: Taller = {
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
export const actualizarTaller = async (t: Taller) => {  
    const ref = doc(db, "talleres", t.key!);
    await updateDoc(ref, { ...t });
}

    // Se eliminan los datos de un taller
export const eliminarTaller = async (key: string) => {
    await deleteDoc(doc(db, "talleres", key));
}
