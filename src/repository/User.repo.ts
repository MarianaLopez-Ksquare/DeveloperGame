import { readUser } from "../firebase";
import { Players } from "../models/Players.model";
import { User } from "../firebase/index"

export const createPlayer = async (uid: string, name: string) => {
    try {
        const newPlayer = await Players.create({uid,  name });
        return newPlayer;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const fetchPlayer = async (uid: string): Promise<Partial<Players>> => {
    try {
        const player = await Players.findOne({
            where: {
                uid: uid
            }});
        const user = await readUser(uid);
        return {...user ,...player?.toJSON()};
    } catch (error) {
        console.error(error);
        throw error;
    }
}