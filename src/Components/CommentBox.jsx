import React, { useState } from 'react';

const CommentBox = () => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handlePostComment = () => {
        // Implement logic to post the comment, e.g., send it to a server or update state
        console.log('Posting comment:', comment);

        // Clear the comment input after posting
        setComment('');
    };

    return (
        <div className="w-full mx-auto">
            <textarea
                className="w-full h-60 p-2  border-2 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Write your comment..."
                value={comment}
                onChange={handleCommentChange}
            ></textarea>
            <div className="mt-2 flex justify-end">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={handlePostComment}
                >
                    Post Comment
                </button>
            </div>
        </div>
    );
};

export default CommentBox;
