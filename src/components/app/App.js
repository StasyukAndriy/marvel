
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import decoration from '../../resources/img/vision.png';
import {lazy, Suspense } from 'react';
import Spinner from "../spinner/Spinner";
const MainPage = lazy(()=>import('../pages/MainPage'))
const SecondPage = lazy(()=>import('../pages/SecondPage'))
const Comic = lazy(()=>import('../pages/Comic'))
const App =()=> {
  
    // const onComicSelected = (id) => {
       
    //    setSelectedComic(id)
       
    // }

    
        return (
            <Suspense fallback={<Spinner/>}>
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>  
                        <Route path="/comics" element={<SecondPage/>}/>
                        <Route path="/comics/:comicId" element={<Comic/>}/>
                    </Routes>
                        
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </main>
                </div>
            </Router>
            </Suspense>
        )
    
}

export default App;