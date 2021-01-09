import React, {FC} from 'react';
import { AppState } from './src/context/State';
import MainRouter from './src/routing/Main.router';

const App : FC = () => {
    return (        
            <AppState>
                <MainRouter />                   
            </AppState>           
    );
};

export default App;