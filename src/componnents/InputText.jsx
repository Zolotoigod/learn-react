import React, {useState} from "react";

function InputText(){
    const [title, setTitle] = useState('title');
    
    return(
        <div className="App">
            <h2>{title}</h2>
            <input type='text' value={title}
            //  двухсторонне связывание
            onChange={ev => setTitle(ev.target.value)}/>
        </div>
    )
}

export default InputText