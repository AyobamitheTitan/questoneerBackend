export const asyncWrapper = (fn) => {
    return async(req,res,next)=>{
        try {
           await fn(req,res) 
        } catch (error) {
            next(error)
        }
    }
}