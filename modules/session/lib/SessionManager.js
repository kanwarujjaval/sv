const uuid = require('uuid/v4');

class SessionManager {

    constructor() {
        this.sessions = new Map();
    }

    addSession(session) {
        let id = uuid();
        this.sessions.set(id, session);
        session.id = id;
        return session;
    }

    deleteSession(sessionId) {
        this.sessions.delete(sessionId);
    }

    persisSessionsToLogs() {
        //todo
    }

}

module.exports = SessionManager;
