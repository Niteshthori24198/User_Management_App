const { v4: uuidv4 } = require('uuid');
const { UserModel } = require('../model/user.model');

/**
 * Asynchronously adds a new user to the database.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} a Promise that resolves to the result of the operation
 */
const addNewUser = async (req, res) => {

    const { email, firstName, lastName, departmentName, contact } = req.body;

    if (!email || !firstName || !lastName || !departmentName || !contact) {
        return res.status(400).send({
            "message": "All fields are required",
            "status": 400,
            "data": null
        })
    }

    try {

        const isPresent = await UserModel.findOne({ email });
        if (isPresent) {
            return res.status(201).send({
                "message": `User with email : ${email} already exists`,
                "status": 409,
                "data": isPresent
            })
        }

        const userId = uuidv4();
        req.body.userId = userId;

        const user = new UserModel({
            ...req.body
        });
        await user.save();

        return res.status(200).send({
            "message": "New User added successfully",
            "status": 200,
            "data": user
        });
    } catch (error) {
        return res.status(500).send(databaseErrorResponse(error.message));
    }
}



/**
 * Retrieves user information based on the user ID provided in the request parameters or All users.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} a Promise that resolves to the user information or an error response
 */

const getUsersInfo = async (req, res) => {

    const { userId } = req.query;
    let { page, limit } = req.query;
    let { search } = req.query;

    if (!page) page = 1;
    if (!limit) limit = 6;

    if (userId) {

        try {

            const user = await checkUserByUserId(userId);
            if (!user) {
                return res.status(404).send(userNotFoundResponse());
            }
            return res.status(200).send({
                "message": "User found",
                "status": 200,
                "data": user
            })
        } catch (error) {
            return res.status(500).send(databaseErrorResponse(error.message));
        }
    }

    if (search) {

        try {

            const user = await UserModel.find({
                $or: [
                    { firstName: { $regex: search, $options: 'i' } }, // Case-insensitive search
                    { lastName: { $regex: search, $options: 'i' } },
                ],
            }).limit(limit).skip((page - 1) * limit);

            if (!user) {
                return res.status(404).send(userNotFoundResponse());
            }

            const totaluser = await UserModel.find({}).count();

            // Pagination logic
            res.append('X-Total-Count', totaluser);
            res.append('Access-Control-Expose-Headers', 'X-Total-Count');

            return res.status(200).send({
                "message": "User found",
                "status": 200,
                "data": user
            })
        } catch (error) {
            return res.status(500).send(databaseErrorResponse(error.message));
        }
    }

    try {

        const totaluser = await UserModel.find({}).count();

        // Pagination logic
        res.append('X-Total-Count', totaluser);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        const users = await UserModel.find({}).limit(limit).skip((page - 1) * limit);

        return res.status(200).send({
            "message": "All users",
            "status": 200,
            "data": users
        });

    } catch (error) {
        return res.status(500).send(databaseErrorResponse(error.message));
    }

}




/**
 * Updates user information based on the provided user ID.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} a Promise that resolves with the updated user data
 */

const updateUserInfo = async (req, res) => {

    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send(userIdNotProvidedResponse());
    }

    try {

        const isPresent = await checkUserByUserId(userId);
        if (!isPresent) {
            return res.status(404).send(userNotFoundResponse());
        }

        await UserModel.findOneAndUpdate({ userId }, req.body);

        const user = await checkUserByUserId(userId);

        return res.status(200).send({
            "message": "User updated successfully",
            "status": 200,
            "data": user
        })

    } catch (error) {
        return res.status(500).send(databaseErrorResponse(error.message));
    }
}



/**
 * Asynchronously removes a user based on the provided userId parameter.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Object} the response object with the result of the user removal operation
 */

const removeUser = async (req, res) => {

    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send(userIdNotProvidedResponse());
    }

    try {

        const isPresent = await checkUserByUserId(userId);
        if (!isPresent) {
            return res.status(404).send(userNotFoundResponse());
        }

        const user = await UserModel.findOneAndDelete({ userId });

        return res.status(200).send({
            "message": "User deleted successfully",
            "status": 200,
            "data": user
        })

    } catch (error) {
        return res.status(500).send(databaseErrorResponse(error.message));
    }
}



/**
 * Asynchronously checks the user by user ID.
 *
 * @param {String} userId - The user ID to check.
 * @return {Object} The user found by the user ID.
 */

async function checkUserByUserId(userId) {

    const user = await UserModel.findOne({ userId });
    return user;
}


/**
 * Function to generate a response when user is not found.
 *
 * @return {object} Response object with message, status, and data
 */
function userNotFoundResponse() {

    return {
        "message": "User not found",
        "status": 404,
        "data": null
    }
}


/**
 * Returns a response object with a message indicating that a valid userId was not provided.
 *
 * @return {object} The response object with message, status, and data properties.
 */
function userIdNotProvidedResponse() {

    return {
        "message": "Kindly provide a valid userId",
        "status": 400,
        "data": null
    }
}


/**
 * Creates a database error response object.
 *
 * @param {string} message - The error message.
 * @return {object} The database error response object.
 */
function databaseErrorResponse(message) {

    return {
        "message": message,
        "status": 500,
        "data": null
    }
}


module.exports = {
    addNewUser,
    getUsersInfo,
    updateUserInfo,
    removeUser
}
