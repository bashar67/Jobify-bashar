const Register = (req, res) => {
  res.send("register user");
};
const Login = (req, res) => {
  res.send("login user");
};
const updateUser = (req, res) => {
  res.send("updateUser user");
};

module.exports = { Register, Login, updateUser };
