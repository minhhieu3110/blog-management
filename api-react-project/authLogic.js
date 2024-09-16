const fs = require('fs');
const filePath = 'users.json';

const readFile = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

const writeFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const register = (username, password, dob) => {
    const users = readFile();
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return { success: false, message: 'Username already exists' };
    }
    
    const user = { username, password, dob };
    users.push(user);
    writeFile(users);
    
    return { success: true, user };
};

const login = (username, password) => {
    const users = readFile();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return { success: true, message: 'Success', data: user };
    }
    return { success: false, message: 'Invalid credentials' };
};

module.exports = { register, login };