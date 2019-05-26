module.exports = class ApiResponse{
    constructor(err,result){
        this.error = err;
        this.result = result;
    }
}