import React from 'react'
import {View,Pressable,Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { realm } from '../realm/realm';

const UserComponent = ({username,life,_id}) => {

    return(
        <View style={{flex:1,padding:20,marginTop:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgb(24,24,24)'}}>
            <Text style={{color:'white',fontSize:24,fontWeight:'bold'}}>{username}</Text>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Pressable style={{height:24,width:24,display:'flex',alignItems:'center',justifyContent:'center',marginRight:20}} onPress={() => {
                    const user = realm.objects("User");

                    console.log("PRess minus",user)

                    user.map((user_,index) => {
                        
                        console.log("usermap",user_,index,_id,user_._id)

                        if ((typeof(user_) != 'undefined') && (String(user_._id) == String(_id))) {
                            realm.write(() => {
                                console.log("Modification de l'utilisateur: "+user_.username)

                                const user__ = user[index]

                                user__.life = Number(user__.life-1);
                                
                            })
                        }
                    })
                }} >

                    <Icon name="minus" size={24} color="white"/>
                </Pressable>
                <Pressable style={{height:24,width:24,display:'flex',alignItems:'center',justifyContent:'center',marginRight:20}} onPress={() => {
                    const user = realm.objects("User");

                    console.log("PRess plus")

                    user.map((user_,index) => {
                        if ((typeof(user_) != 'undefined') && (String(user_._id) == String(_id))) {
                            realm.write(() => {
                                console.log("Modification de l'utilisateur: "+user_.username)

                                const user__ = user[index]

                                user__.life = Number(user__.life+1);
                                
                            })
                        }
                    })
                }} >

                    <Icon name="plus" size={24} color="white"/>
                </Pressable>
                <Icon name="heart" size={24} color="red"/>
                <Text style={{color:'white',fontSize:24,fontWeight:'bold',marginLeft:10}}>{life}</Text>
                <Pressable style={{height:24,width:24,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:20}} onPress={() => {
                    const user = realm.objects("User");

                    user.map(user_ => {
                        if ((typeof(user_) != 'undefined') && (String(user_._id) == String(_id))) {
                            realm.write(() => {
                                console.log("Suppression de l'utilisateur: "+user_.username)
                                realm.delete(user_);
                            })
                        }
                    })
                }} >

                    <Icon name="remove" size={24} color="white"/>
                </Pressable>
            </View>
            
        </View>
    )

}

export default UserComponent