// postLogic.js
const posts = [];

const createPost = (title, content, username, status, type) => {
    const newPost = {
        id: new Date().getTime(),
        title,
        content,
        createAt: new Date(),
        username,
        status,
        type,
    };
    posts.push(newPost);
    return newPost;
};

const getPosts = () => {
    return posts;
};

const getPostById = (id) => {
    return posts.find(post => post.id === id);
};

const updatePost = (id, updatedData) => {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...updatedData };
        return posts[index];
    }
    return null;
};

const deletePost = (id) => {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        return posts.splice(index, 1);
    }
    return null;
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
