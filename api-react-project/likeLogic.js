// likeLogic.js
const likes = [];

// Thêm like
const likePost = (idPost, username) => {
    // Kiểm tra xem người dùng đã like bài viết chưa
    const likeExists = likes.some(like => like.idPost === idPost && like.username === username);
    if (likeExists) {
        return { success: false, message: 'User already liked this post' };
    }

    const newLike = {
        id: new Date().getTime(),
        idPost,
        username,
        createAt: new Date(),
    };
    likes.push(newLike);
    return { success: true, newLike };
};

// Unlike (bỏ like)
const unlikePost = (idPost, username) => {
    const likeIndex = likes.findIndex(like => like.idPost === idPost && like.username === username);
    if (likeIndex !== -1) {
        likes.splice(likeIndex, 1);
        return { success: true, message: 'Unlike successful' };
    }
    return { success: false, message: 'Like not found for this user and post' };
};

// Lấy danh sách likes cho một bài viết
const getLikesByPost = (idPost) => {
    return likes.filter(like => like.idPost === idPost);
};

module.exports = { likePost, unlikePost, getLikesByPost };
