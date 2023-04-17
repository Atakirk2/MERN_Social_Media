import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization ")
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" })
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(500).json({ msg: error.msg })
  }
}
