import React,{useState,useEffect} from 'react'
import AddUserComponent from '../component/AddUserComponent'
import UserComponent from '../component/UserComponent'
import {View,FlatList, SafeAreaView,Text} from 'react-native'

import Realm from 'realm';

import { UserSchema } from '../realm/schema/UserSchema';

const HomeScreen = () => {

    const [users,setUsers] = useState([])

    useEffect(() => {
        Realm.open({
            schema: [UserSchema],
            deleteRealmIfMigrationNeeded: true,
        }).then(realm => {
        const user = realm.objects('User');

        setUsers([...user]);
        try{
            user.addListener(() => {
                setUsers([...user]);
            });
        }
        catch (error) {
            console.error(
            `Unable to update the user' state, an exception was thrown within the change listener: ${error}`
            );
        }
        return () => {
            
            user.removeAllListeners();
            
            realm.close();
        };
        });
    }, []);

    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <AddUserComponent setUsers={setUsers}/>
            <SafeAreaView style={{flex:16}}>
                <FlatList
                    data={users}
                    renderItem={({item}) => <UserComponent username={item.username} life={item.life} _id={item._id} />}
                    keyExtractor={(item) => item.username}
                />
            </SafeAreaView>
        </View>
    )

}

export default HomeScreen