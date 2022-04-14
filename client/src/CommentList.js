import React, {useState, useEffect} from "react";
import axios from "axios";

// destructure the postId 
export default ({postId}) => {

    const [comments, setComments] = useState({});

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = Object.values(comments).map(comment => {
        return <li key={comment.id}>{comment.text}</li>
    });

    return <ul>
        {renderedComments}
    </ul>

};