const validateAdmin = async (req, _res, next) => {
  const { role } = req.user;
  if (role !== 'administrator') {
    return next({
      message: 'Only admins can access this page',
      status: 403,
    });
  }
  return next();
};

const validateSeller = async (req, _res, next) => {
  const { role } = req.user;
  if (role !== 'seller') {
    return next({
      message: 'Only sellers can access this page',
      status: 403,
    });
  }
  return next();
};

const validadeCustomer = async (req, _res, next) => {
  const { role } = req.user;
  if (role !== 'customer') {
    return next({
      message: 'Only customers can access this page',
      status: 403,
    });
  }
  return next();
};

module.exports = {
  validateAdmin,
  validateSeller,
  validadeCustomer,
};
