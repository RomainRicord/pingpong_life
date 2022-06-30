import React from 'react'
import {View,TextInput,Pressable,Text} from 'react-native'

import { realm } from '../realm/realm';
import {ObjectID} from 'bson';

const AddUserComponent = ({setUsers}) => {

    const [user,setUser] = React.useState('')

    return(
        <View style={{flex:1,flexDirection:'row',height:48}}>
            
            <TextInput style={{flex:4,height:48,borderWidth:1,borderColor:'black',color:'black'}}
                placeholder="username"
                onChangeText={(username) => setUser(username)}
                value={user}
            />

            <Pressable onPress={() => {
                
                realm.write(()=>{
                    realm.create('User',{
                      _id:new ObjectID(),
                      username:user,
                      life:0
                  })})
                setUser('')

            }} style={{flex:1,height:48,justifyContent:'center',alignItems:'center',backgroundColor:'#002D62'}}>
                <Text style={{color:'white',fontSize:24,fontWeight:'bold'}}>+</Text>
            </Pressable>

        </View>
    )

}

export default AddUserComponent