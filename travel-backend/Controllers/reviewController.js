const reviews = require('../Models/reviewSchema')

exports.addReview = async (req, res) => {
    console.log("inside addreview");
    // res.status(200).json("Add Project request received")
    const userId = req.payload
    // console.log(username);
    const { blogId, username, reviewText, time } = req.body;
    console.log(blogId, userId, username, reviewText, time);
    try {
        const existingReview = await reviews.findOne({ userId, blogId })
        if (existingReview) {
            res.status(406).json("review Already exists")

        }
        else {
            // ther is no other  title like this
            const newReview = new reviews({ blogId, userId, username, reviewText, time })
            // send response to the client
            await newReview.save()
            res.status(200).json(newReview)

        }

    } catch (err) {
        res.status(401).json({ "Request failded": +err })


    }



}

exports.getReview = async (req, res) => {
    const { id } = req.params
    try {
        const blogReview = await reviews.find({ blogId: id })
        res.status(200).json(blogReview)
    }
    catch (err) {
        res.status(401).json({ "Request failded": +err })

    }

}

// delete review
exports.deleteReview = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    try {
        const deleteReview = await reviews.deleteOne({ userId, _id: id })
        res.status(200).json("Deleted Successfully")

    }
    catch (err) {
        res.status(401).json({ "Request failded": +err })
    }
}

// delete user rewiew

exports.deleteUserReview = async (req, res) => {
    const { id } = req.params
    // const userId = req.payload
    try {
        const deleteReview = await reviews.deleteMany({ userId:id})
        res.status(200).json(deleteReview)

    }
    catch (err) {
        res.status(401).json({ "Request failded": +err })
    }
}

