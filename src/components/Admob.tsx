import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { View } from 'react-native';
import {
  AdMobBanner
} from 'expo-ads-admob';

export interface AdmobProps{
  id: string
}

export default function Admob({id}: AdmobProps){
 const [idAdmob, setIdAdmob] = useState<string>()

  useEffect(()=>{
    if(Constants.isDevice && __DEV__){
      setIdAdmob("ca-app-pub-3940256099942544/6300978111")
      return
    }else{
      setIdAdmob(id)
    }
    },[])

  return (
    <View>
      <AdMobBanner
        bannerSize='largeBanner'
        adUnitID={idAdmob}
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(err)=> console.log(err)}
        />
    </View>
  );
}