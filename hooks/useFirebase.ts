import { initializeApp } from "firebase/app";
import { RemoteConfig, getRemoteConfig, getString, isSupported as isRemoteConfigSupproted, } from "firebase/remote-config";
import { getValue } from "firebase/remote-config";
import { fetchAndActivate } from "firebase/remote-config";
import { useEffect, useState } from "react";

export const useFirebase = ()  =>{
  const firebaseConfig = {
    apiKey: "AIzaSyCtuGHH7W7-QLGpoXk4fiKI8B3PRCBLaiI",
    authDomain: "mycall-portfolio.firebaseapp.com",
    projectId: "mycall-portfolio",
    storageBucket: "mycall-portfolio.appspot.com",
    messagingSenderId: "426221604667",
    appId: "1:426221604667:web:45f8d52e1cc44de108f11e",
    measurementId: "G-3BL6XQTSTL"
  };
  
  

const [data, setData] = useState([]);

  const app = initializeApp(firebaseConfig);
  let remoteConfig : RemoteConfig


  function initializeRemoteConfig() {
    isRemoteConfigSupproted().then(supported => {
      if (supported) {
        remoteConfig = getRemoteConfig(app);
        remoteConfig.settings.minimumFetchIntervalMillis = 10000;
  
        remoteConfig.defaultConfig = {
          "configData": "Welcome"
        };
        
        fetchAndActivate(remoteConfig)
        .then(() => {
          const titleData = JSON.parse(getString(remoteConfig, 'configData')) ;
          setData(titleData)
    
        })
        .catch((err) => {
        console.log("Error fetching remote config")
        });
      }
    });
  
    return remoteConfig;
  }
useEffect(() => {
  initializeRemoteConfig()
}, [])
    return { data};

}