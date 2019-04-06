const requireDir = require('./../../utils/Util').requireDir;
const Validators = requireDir(__dirname + '/validators');
const Handlers = requireDir(__dirname + '/handlers');

module.exports = [
    {
        path: '/api/v1/users/',
        method: 'POST',
        handler: Handlers.postUsers,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required',
                scope: ['SIGNUP', 'SUPER_ADMIN', 'SCHOOL_STAFF', 'SCHOOL_ADMIN']
            },
            validate: Validators.postUsers,
            description: 'Create User',
            notes: 'New user signup api',
            tags: ['api', 'user'],
        },
    },
    {
        path: '/api/v1/users/children',

        method: 'POST',
        handler: Handlers.getChildren,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'required',
                // scope: ['SIGNUP', 'SUPER_ADMIN', 'SCHOOL_STAFF', 'SCHOOL_ADMIN']
            },
            validate: Validators.getChildren,
            description: 'Create User',
            notes: 'New user signup api',
            tags: ['api', 'user'],
        },
    },
    {
        path: '/api/v1/users/children',

        method: 'GET',
        handler: function() {
            // Fetch child options here by id (sent from frontend)
            // sample data -  {
            //     "type": "List",
            //     "title": "Select your option",
            //     "iterator": [
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "View subjects",
            //             "viewUrl": "/subjects",
            //             "dataUrl": "/subjects"
            //         },
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "View attendance",
            //             "viewUrl": "/attendance",
            //             "dataUrl": "/attendance/view"
            //         },
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "View homework",
            //             "viewUrl": "/homework",
            //             "dataUrl": "/homework/view"
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
                mode: 'required',
            },
            validate: Validators.getChildren,
            description: 'Fetch child options',
            notes: 'Fetch child options api (hit from parent app)',
            tags: ['api', 'user'],
        },
    },
    {
        path: '/api/v1/users/students',

        method: 'GET',
        handler: function() {
            // Fetch all students for batch id
            // sample data - {
            //     "type": "List",
            //     "title": "List of students",
            //     "iterator": [
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "Kanwar Ujjaval Singh",
            //             "viewUrl": "/Kanwar",
            //             "dataUrl": "/students/Kanwar"
            //         },
            //         {
            //             "thumb": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
            //             "text": "Sachin Verma",
            //             "viewUrl": "/Sachin",
            //             "dataUrl": "/students/Sachin"
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
                mode: 'required',
            },
            validate: Validators.getChildren,
            description: 'Fetch students',
            notes: 'Fetch all students for a batch',
            tags: ['api', 'user'],
        },
    },
];