const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/homework/',
        method: 'POST',
        handler: function(){
            // Assign homework to class or student if student id sent
            
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
            description: 'Fetch homework',
            notes: 'Fetch homework api',
            tags: ['api', 'homework'],
        },
    },
    {
        path: '/api/v1/homework/',
        method: 'GET',
        handler: function(){
            // Fetch homework by child id
            
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
            description: 'Fetch homework',
            notes: 'Fetch homework api',
            tags: ['api', 'homework'],
        },
    },
];