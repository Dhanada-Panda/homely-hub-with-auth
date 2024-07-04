import React from 'react';
import {Routes,Route} from 'react-router-dom';
function Allroute(){
    return(
        <div>
           <Routes>
            <Route path="/"  element={<Pratice/>}/>
           </Routes>
        </div>
    );
}
export default Allroute;