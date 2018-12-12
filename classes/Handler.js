class Handler{
    constructor(request, h){
        this.request = request;
        this.h = h;
        this.result = {};
    }
    
    getResult(){
        return this.result;
    }
}

module.exports = Handler;