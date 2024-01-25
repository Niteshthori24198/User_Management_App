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

    const { email, firstName, lastName, departmentName } = req.body;

    if (!email || !firstName || !lastName || !departmentName) {
        return res.status(400).send({
            "message": "All fields are required",
            "status": 400,
            "data": null
        })
    }

    try {

        const isPresent = await UserModel.findOne({ email });
        if (isPresent) {
            return res.status(409).send({
                "message": `User with email : ${email} already exists`,
                "status": 409,
                "data": null
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