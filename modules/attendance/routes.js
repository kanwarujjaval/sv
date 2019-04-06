const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/attendance',
        method: 'POST',
        handler: function(){
            // Mark attendance by student id
            
            result = {
                data: {}
            }
        },
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required'
            },
            validate: Validators.postSubject,
            description: 'Mark attendance',
            notes: 'Mark attendance for a student by teacher',
            tags: ['api', 'homework'],
        },
    },
];