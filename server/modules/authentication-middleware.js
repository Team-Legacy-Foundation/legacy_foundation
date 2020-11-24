
// In these authentication/authorization checks,
// req.user has properties:
// id, lcf_id, admin_id, email, role, last_login, and token.

const rejectUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const allowAdminOnly = (req, res, next) => {
  rejectUnauthenticated(req, res, () => {
    if(req.user.role !== 'admin') {
      res.sendStatus(401);
    } else {
      next();
    }
  });
};

const allowAdminOrSelf = (req, res, next) => {
  rejectUnauthenticated(req, res, () => {
    const isAuthorized = req.user.role === 'admin' || isStudentSelf(req);
    if(isAuthorized) {
      next();
    } else {
      res.sendStatus(401);
    }
  });
};

const ensureLcfIdParamsMatch = (req, res, next) => {
  // Make sure body's lcf_id and url's lcf_id match; students could
  // see/edit other students's records if this check isn't done.
  if(Number(req.body.lcf_id) !== Number(req.params.lcf_id)) {
    res.send(400);
  } else {
    next();
  }
};

/**
 * Ensure that the request parameter 'lcf_id' exists
 * and matches the logged-in student's lcf_id.
 */
const isStudentSelf = (req) => {
  if(req.user.role !== 'student') {
    return false;
  }
  let lcf_id = req.params.lcf_id || (req.body && req.body.lcf_id);
  if(lcf_id == null) {
    return false;
  }
  lcf_id = Number(lcf_id);
  if(isNaN(lcf_id)) {
    return false;
  }
  return req.user.lcf_id === lcf_id;
};

module.exports = { rejectUnauthenticated, allowAdminOnly, allowAdminOrSelf, ensureLcfIdParamsMatch };
