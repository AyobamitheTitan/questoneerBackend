const asyncWrapper = (fn) => {
    return async(req,res,next)=>{
        try {
            await fn(req,res,next)
        } catch (error) {
            // instead of error._message it could be error._message 
            res.status(400).json({message:error._message,type:error.name})
            next(error)
        }
    }
};

export default asyncWrapper