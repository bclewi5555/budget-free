/*
======================================================
Index controller
======================================================
*/

exports.serveIndex = async (req, res) => {
    await res.json({
        title: 'Express',
        message: 'You made it to the secure budget API!'
    });
}