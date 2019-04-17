import {get} from "config";

export function initConfig(){
    if(!get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}
