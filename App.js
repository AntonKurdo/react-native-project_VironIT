import React, {FC, useContext} from 'react';
// import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { AppState } from './src/context/State';
import MainRouter from './src/routing/Main.router';

const App = () => {
    return (        
        <AppState>
            <MainRouter />                   
        </AppState>           
    );
};

// TaskManager.defineTask("GEO_FENCING", ({ data: { eventType, region }, error }) => {
// 	if (error) {
// 		console.info("err ", error);
// 		return;
// 	}
// 	// if (Platform.OS === "ios") {
// 	// 	getiOSNotificationPermission();
// 	// }
// 	if (eventType === Location.GeofencingEventType.Enter) {		
// 		console.log(region)
// 		// getRegionsArray(region, "enter");
// 	} else if (eventType === Location.GeofencingEventType.Exit) {
// 		console.log(region)
// 		// getRegionsArray(region, "exit");
// 	}
// });

export default App;