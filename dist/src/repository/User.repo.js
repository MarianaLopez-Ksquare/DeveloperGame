"use strict";
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
exports.fetchPlayer = exports.createPlayer = void 0;
const firebase_1 = require("../firebase");
const Players_model_1 = require("../models/Players.model");
const createPlayer = (uid, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlayer = yield Players_model_1.Players.create({ uid, name });
        return newPlayer;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.createPlayer = createPlayer;
const fetchPlayer = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield Players_model_1.Players.findOne({
            where: {
                uid: uid
            }
        });
        const user = yield (0, firebase_1.readUser)(uid);
        return Object.assign(Object.assign({}, user), player === null || player === void 0 ? void 0 : player.toJSON());
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.fetchPlayer = fetchPlayer;
