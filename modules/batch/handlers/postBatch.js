const Handler = require('./../../../classes/Handler');
const BatchManager = require('../lib/BatchManager');

class postBatchHandler extends Handler {

    constructor(request, h) {
        super(request, h);
        this.batchManager = new BatchManager(h);
    }

    async saveBatch() {
        let batch = this.request.payload;
        this.batchManager.insertBatch(batch);
    }

    async makeResult() {
        this.saveBatch();
        this.result = {}
    }

}

module.exports = function (request, h) {
    return new postBatchHandler(request, h).getResult();
};
