// import { readUser } from "../firebase";
// import { Patients } from "../models/Players.model";
// import { User } from "../firebase/index"

import { readUser } from "../firebase";
import { Admins } from "../models/Admins.model";

// export const createPatient = async (uid: string, email: string, displayName: string, password: string, name: string, lastName: string, age: number, gender: string) => {
//     try {
//         const newPatient = await Patients.create({uid, isActive: true,  name, lastName, age, gender});
//         return newPatient;
//     } catch (error) {
//         console.error(error);
//         return error;
//     }
// }

// export const modifyIsActiveProp = async (uid: string, isActive: boolean) => {
//     try {
//         const foo = await Patients.update({isActive: isActive}, {
//             where:{ 
//                 uid: uid
//             }
//         })
//         return foo;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

export const fetchAdmin = async (uid: string): Promise<Partial<Admins> | null> => {
    try {
        const admin = await Admins.findOne({
            where: {
                uid: uid
            }});
        if (!admin) return null;
        const user = await readUser(uid);
        return {...user ,...admin?.toJSON()};
    } catch (error) {
        console.error(error);
        throw error;
    }
}