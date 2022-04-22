import React from "react";

// destructure the postId 
export default ({comments}) => {

    const renderedComments = Object.values(comments).map(comment => {
        if(comment.status == 'pending'){
            return <li>{'Comment pending moderation'}</li>
        } else if(comment.status == 'rejected'){
            return <li>{'Comment removed due to bad words'}</li>
        } else {
            return <li key={comment.id}>{comment.text}</li>
        }
        
    });

    return <ul>
        {renderedComments}
    </ul>

};