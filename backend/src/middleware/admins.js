module.exports = (req, res, next) => {
  if (req.user?.role !== "admin") {
    //MENSAJE PARA REQUERIR SI O SI QUE SEA ADMIN
    return res.status(403).json({ ok: false, error: "Solo admin" });
  }
  next();
};
