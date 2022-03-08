exports.addProjectValidation = (req,res,next)=>{
    try {
        const {body} = req;
        // 
        // Do Project Validation here
        
        // 
        return next();
    } catch (error) {
        return next(error);
    }
}