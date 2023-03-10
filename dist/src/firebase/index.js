"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.disableUser = exports.updateUser = exports.getAllUser = exports.readUser = exports.createUserIfNotExist = exports.createUser = void 0;
const admin = __importStar(require("firebase-admin"));
//traer el record que nos regresa firewalle y le incluimos el role pq firebase no sabe el rol, es algo de
// nuestro codigo, nosotros lo definimos
const mapToUser = (user) => {
    var _a;
    const customClaims = (user.customClaims || { role: "" });
    const role = (_a = customClaims.role) !== null && _a !== void 0 ? _a : "";
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        role,
    };
};
const createUser = (displayName, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = yield admin.auth().createUser({
        displayName,
        email,
        password
    });
    yield admin.auth().setCustomUserClaims(uid, { role });
    return uid;
});
exports.createUser = createUser;
const createUserIfNotExist = (displayName, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield admin.auth().createUser({
        displayName,
        email,
        password
    });
    console.log(user);
    yield admin.auth().setCustomUserClaims(user.uid, { role });
    return user.uid;
});
exports.createUserIfNotExist = createUserIfNotExist;
const readUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield admin.auth().getUser(uid);
    return mapToUser(user);
});
exports.readUser = readUser;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const listOfUsers = yield admin.auth().listUsers(10);
    const users = listOfUsers.users.map(mapToUser);
    return users;
});
exports.getAllUser = getAllUser;
const updateUser = (uid, displayName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield admin.auth().updateUser(uid, {
        displayName
    });
    return mapToUser(user);
});
exports.updateUser = updateUser;
const disableUser = (uid, disabled) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield admin.auth().updateUser(uid, {
        disabled
    });
});
exports.disableUser = disableUser;
