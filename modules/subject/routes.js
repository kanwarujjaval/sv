const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/subject/',
        method: 'POST',
        handler: Handlers.postSubject,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required'
            },
            validate: Validators.postSubject,
            description: 'Create Subject',
            notes: 'New subject api',
            tags: ['api', 'subject'],
        },
    },
    {
        path: '/api/v1/subjects/',
        method: 'GET',
        handler: function(){
            // Fetch all subjects
            // sample - data : {
            //     "type": "List",
            //     "title": "Select Subject",
            //     "iterator": [
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "Physics",
            //             "viewUrl": "/physics",
            //             "dataUrl": "/subjects/physics"
            //         },
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "Chemistry",
            //             "viewUrl": "/chemistry",
            //             "dataUrl": "/subjects/chemistry"
            //         },
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "Maths",
            //             "viewUrl": "/maths",
            //             "dataUrl": "/subjects/maths"
            //         }
            //     ]
            // }
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
            description: 'Fetch all Subjects',
            notes: 'Fetch all subjects api',
            tags: ['api', 'subject'],
        },
    },
    {
        path: '/api/v1/subject/',
        method: 'GET',
        handler: function(){
            // Fetch subject by id
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
            description: 'Fetch all Subjects',
            notes: 'Fetch all subjects api',
            tags: ['api', 'subject'],
        },
    },
];