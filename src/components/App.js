import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("landing");

  // State for posts, users, notifications, and new post creation
  const [posts, setPosts] = useState([
    { id: 1, author: "John", content: "Hello World!", reactions: 0 },
    { id: 2, author: "Jane", content: "React is awesome!", reactions: 0 },
  ]);
  const [users] = useState(["John", "Jane"]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [postContent, setPostContent] = useState("");

  // Handlers for Landing Page
  const handleReaction = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, reactions: post.reactions + 1 } : post
      )
    );
  };

  // Handlers for Notifications Page
  const refreshNotifications = () => {
    setNotifications([
      "John liked your post.",
      "Jane commented on your post.",
      "You have a new follower.",
    ]);
  };

  // Handlers for Create Post Page
  const handleCreatePost = () => {
    if (!selectedAuthor || !postContent) {
      alert("Please select an author and write content.");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      author: selectedAuthor,
      content: postContent,
    };
    setPosts([...posts, newPost]);
    alert("Post added successfully!");
    setPostContent("");
  };

  return (
    <div>
      {/* Navigation Tabs */}
      <nav>
        <button onClick={() => setActiveTab("landing")}>Landing Page</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("notifications")}>Notifications</button>
        <button onClick={() => setActiveTab("create")}>Create Post</button>
      </nav>

      {/* Conditional Rendering of Tabs */}
      {activeTab === "landing" && (
        <div>
          <h1>Landing Page</h1>
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <h3>{post.author}</h3>
                <p>{post.content}</p>
                <p>Reactions: {post.reactions}</p>
                <button onClick={() => handleReaction(post.id)}>React</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div>
          <h1>Users Page</h1>
          <div className="users-list">
            {users.map((user, index) => (
              <button key={index} onClick={() => setSelectedUser(user)}>
                {user}
              </button>
            ))}
          </div>
          {selectedUser && (
            <div>
              <h2>Posts by {selectedUser}</h2>
              {posts
                .filter((post) => post.author === selectedUser)
                .map((post) => (
                  <div key={post.id}>
                    <p>{post.content}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "notifications" && (
        <div>
          <h1>Notifications Page</h1>
          <button className="button" onClick={refreshNotifications}>
            Refresh Notifications
          </button>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "create" && (
        <div>
          <h1>Create Post</h1>
          <select
            id="postAuthor"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Select Author</option>
            {users.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
          </select>
          <textarea
            id="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write your post here..."
          ></textarea>
          <button onClick={handleCreatePost}>Add Post</button>
          <h2>Posts</h2>
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <h3>{post.author}</h3>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
