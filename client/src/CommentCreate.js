import React, { useState } from "react";
import axios from "axios";


export default ({postId}) => {
    const [text, setText] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        
        axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            text
        });

        setText(''); 

    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-grup">
                <label>New Comment</label>
                <input value={text} onChange={e => {setText(e.target.value)}} className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>

};