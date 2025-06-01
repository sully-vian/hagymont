class SessionService {
  static EXPIRATION_KEY = 'tokenExpiry';
  static USERNAME_KEY = 'username';
  static ROLE_KEY = 'role';
  static TOKEN_KEY = 'token';
  static DEFAULT_EXPIRATION = 1000 * 60 * 60; // 1 heure

  static startSession({ token, username, role, expirationMs = SessionService.DEFAULT_EXPIRATION }) {
    const expiryTime = Date.now() + expirationMs;
    sessionStorage.setItem(SessionService.TOKEN_KEY, token);
    sessionStorage.setItem(SessionService.USERNAME_KEY, username);
    sessionStorage.setItem(SessionService.ROLE_KEY, role);
    sessionStorage.setItem(SessionService.EXPIRATION_KEY, expiryTime.toString());
  }

  static clearSession() {
    sessionStorage.removeItem(SessionService.TOKEN_KEY);
    sessionStorage.removeItem(SessionService.USERNAME_KEY);
    sessionStorage.removeItem(SessionService.ROLE_KEY);
    sessionStorage.removeItem(SessionService.EXPIRATION_KEY);
  }

  static isSessionValid() {
    const expiry = sessionStorage.getItem(SessionService.EXPIRATION_KEY);
    if (!expiry) return false;
    if (Date.now() > parseInt(expiry, 10)) {
      SessionService.clearSession();
      return false;
    }
    return true;
  }

  static getUsername() {
    if (!SessionService.isSessionValid()) return null;
    return sessionStorage.getItem(SessionService.USERNAME_KEY);
  }

  static getRole() {
    if (!SessionService.isSessionValid()) return null;
    return sessionStorage.getItem(SessionService.ROLE_KEY);
  }

  static getToken() {
    if (!SessionService.isSessionValid()) return null;
    return sessionStorage.getItem(SessionService.TOKEN_KEY);
  }
}

export default SessionService;
