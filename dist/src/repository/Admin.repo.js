"use strict";
// import { readUser } from "../firebase";
// import { Patients } from "../models/Players.model";
// import { User } from "../firebase/index"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAdmin = void 0;
const firebase_1 = require("../firebase");
const Admins_model_1 = require("../models/Admins.model");
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
const fetchAdmin = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admins_model_1.Admins.findOne({
            where: {
                uid: uid
            }
        });
        if (!admin)
            return null;
        const user = yield (0, firebase_1.readUser)(uid);
        return Object.assign(Object.assign({}, user), admin === null || admin === void 0 ? void 0 : admin.toJSON());
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.fetchAdmin = fetchAdmin;
