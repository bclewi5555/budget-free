/*
Middleware to give ejs access to flash messages as global variables
https://stackoverflow.com/questions/49906557/how-to-use-connect-flash-with-ejs-in-express-4-x
*/

exports.flashMessages = (req, res, next) => {
    const successFlashMessageArray = req.flash('success');
    const errorFlashMessageArray = req.flash('error');
    res.locals.successFlashMessage = successFlashMessageArray[0];
    res.locals.errorFlashMessage = errorFlashMessageArray[0];
    next();
};