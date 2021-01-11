import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {validationSchema} from '../validation/createNewUser.scheme';

const clearStorage = async() => {
    await AsyncStorage.clear();
};
// clearStorage();

interface storeData {
    login : string,
    password : string
};



export const getData = async() : Promise <string> => {
    try {
        const data = await AsyncStorage.getItem('users');   
        return data
            ? data
            : '[]';
    } catch (e) {
        console.log(e.message);
    }
}

export const storeData = async({login, password} : storeData) : Promise <boolean> => {
    try {
        const validate = await validationSchema.validate({email: login, password});
        if (!validate.error) {
            const prev = await getData();
            await AsyncStorage.setItem('users', JSON.stringify([...JSON.parse(prev),
                {
                    login,
                    password,
                    shops: []
                }
            ]));         
            Alert.alert('Success', `User with login ${login} has been created...`);
            return true;         
        } else {           
            Alert.alert('Validation Error...', 'Check Your credentials!!! Minimum password - 3 symbols');
            return false;
        }
    } catch (e) {
        console.log(e.message);
    }
};
