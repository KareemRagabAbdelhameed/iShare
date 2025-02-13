import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import image from './../../assets/images/select.jfif';
import axios from 'axios';

const ViewPosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the post
        const postResponse = await axios.get(`https://dummyjson.com/products/${id}`);
        const foundPost = postResponse.data;

        if (foundPost) {
          setPost(foundPost);
          setLikeCount(foundPost.likes || 0);

          // Fetch comments for the post
          const commentsResponse = await axios.get(`https://dummyjson.com/comments/post/${id}`);
          setComments(commentsResponse.data.comments);

          // Check if the current user has liked the post (replace with actual logic)
          const userLiked = false; // Replace with actual check from the backend
          setLiked(userLiked);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      if (liked) {
        // Unlike the post
        await axios.delete(`https://dummyjson.com/posts/${id}/like`, {
          data: { userId: 1 }, // Replace with the actual user ID
        });
        setLikeCount((prev) => prev - 1);
      } else {
        // Like the post
        await axios.post(`https://dummyjson.com/posts/${id}/like`, {
          userId: 1, // Replace with the actual user ID
        });
        setLikeCount((prev) => prev + 1);
      }
      setLiked((prev) => !prev); // Toggle like status
    } catch (error) {
      console.error('Failed to update like:', error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const response = await axios.post(`https://dummyjson.com/comments/add`, {
          postId: id,
          body: comment,
          userId: 1, // Replace with the actual user ID
        });
        setComments([...comments, response.data]);
        setComment('');
        setShowCommentInput(false);
      } catch (error) {
        console.error('Failed to submit comment:', error);
      }
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://dummyjson.com/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId)); // Remove the deleted comment from the list
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  // Handle delete post
  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      navigate('/posts');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  // Handle update post
  const handleUpdatePost = () => {
    navigate(`/edit-post/${id}`);
  };

  // Display loading state
  if (loading) {
    return (
      <div className="text-center mt-32">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return <div className="text-center mt-16 text-red-500">Error: {error}</div>;
  }

  // Display if post is not found
  if (!post) {
    return <div className="text-center mt-16">Post not found!</div>;
  }

  return (
    <div className="w-[95%] mx-auto text-center max-w-4xl shadow-2xl p-4 md:p-10 rounded-lg">
      {/* User Details */}
      <div className="flex items-center mb-6">
        <img
          src={image}
          alt="kareem"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">kareem Ragab</p>
        </div>
      </div>

      {/* Title and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">{post.title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleUpdatePost}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={handleDeletePost}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* Image */}
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full md:w-72 h-auto mx-auto object-cover rounded-lg"
      />

      {/* Additional Details */}
      <div className="mt-6">
        <p className="text-gray-700">{post.description}</p>
      </div>

      {/* Icons for Like, Comment */}
      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <div className="w-full flex justify-between items-center space-x-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleLike}
          >
            <FaHeart className={liked ? 'text-red-500' : 'text-gray-500'} />
            <span>{likeCount}</span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowCommentInput(!showCommentInput)}
          >
            <FaComment className="text-gray-500" />
            <span>{comments.length}</span>
          </div>
          <div className="flex items-center">
        <img
          src={image}
          alt="kareem"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-sm font-semibold">Business Owner</p>
        </div>
      </div>
        </div>
      </div>

      {/* Comment Input Area */}
      {showCommentInput && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-mainColor"
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-hoverColor"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {/* Display Comments */}
      <div className="mt-6 text-left">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4 p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-gray-700">{comment.body}</p>
                <p className="text-sm text-gray-500 mt-2">By User {comment.userId}</p>
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPosts;