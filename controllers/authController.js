const { users } = require('../models');
const { User } = require('../models/users')
const generateToken = require('../config/generateToken');
const { comparePassword, hashPassword } = require('../config/bcrypt')
const { successResponse, errorResponse, validationErrorResponse, notFoundResponse, internalErrorResponse } = require('../config/responseJson')

async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ where: { email } });
        if (existingUser) {
            errorResponse(res, 'User already exists', 400)
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await users.create({
            name,
            email,
            password: hashedPassword
        });

        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        successResponse(res, 'User registered Successfully', userResponse, 201);
    } catch (error) {
        console.error(error)
        internalErrorResponse(res, error);
    }
};

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await users.findOne({ where: { email } });
        if (!user) {
            notFoundResponse(res, 'user not found');
        };

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            notFoundResponse(res, 'invalid password', 401);
        };

        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        const token = generateToken(user);
        successResponse(res, 'Logged in successfully', {
            user: userResponse,
            token
        }, 200);


    } catch (error) {
        console.error('error logging in user', error);
        internalErrorResponse(res, error);
    }
};

async function me(req, res) {
    try {
        const user = await users.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email']
        });
        if (!user) {
            errorResponse(res, 'user not found', 404);
        }
        successResponse(res, 'User fetched successfully', user, 200);
    } catch (error) {
        console.error('Error fetching user: ', error);
        internalErrorResponse(res, error);

    }
};

async function logout(req, res) {
    try {
        successResponse(res, 'Logged out succesfully', null, 200);
    } catch (error) {
        console.error('Error logging out user: ', error);
        internalErrorResponse(res, error)
    }
}

module.exports = {
    register,
    login,
    me,
    logout
}