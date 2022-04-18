import React from "react";

// destructure the postId 
export default ({comments}) => {

    const renderedComments = Object.values(comments).map(comment => {
        return <li key={comment.id}>{comment.text}</li>
    });

    return <ul>
        {renderedComments}
    </ul>

};