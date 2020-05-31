exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.employeeBoard = (req, res) => {
  res.status(200).send('Employee Content.')
}

exports.ManagerBoard = (req, res) => {
  res.status(200).send('Manager Content.')
}
