// authLogic.js
const users = [];

const register = (username, password, dob) => {
    // Kiểm tra xem username đã tồn tại hay chưa
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return { success: false, message: 'Username already exists' };
    }

    const user = { username, password, dob };
    users.push(user);
    return { success: true, user };
};

const login = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return { success: true, message: 'Success', data: user };
    }
    return { success: false, message: 'Invalid credentials' };
};

module.exports = { register, login };
