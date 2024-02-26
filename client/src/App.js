import React from "react";

import {Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar";
import Create from "./components/create";
import RecordList from "./components/recordList";

const App = () => {
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route exact path="/create" element={<Create />} />
            </Routes>
        </div>
    );
};

export default App;