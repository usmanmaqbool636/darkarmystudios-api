const moment = require("moment");
const validator = require("validator");
exports.addProjectValidation = (req, res, next) => {
  try {
    const { body } = req;
    if (validator.isEmpty(body.title || ""))
      return next({ message: "title required", status: 422 });
    console.log(body.assignees);
    // if (!body.assignees)
    //   return next({ message: "atleas one assignee required", status: 422 });

    return next();
  } catch (error) {
    return next(error);
  }
};

exports.addTodoValidation = (req, res, next) => {
  try {
    const { body } = req;
    if (validator.isEmpty(body.title || ""))
      return next({ message: "title required", status: 422 });
    // if (!body.assignee)
    //   return next({ message: "assignee required", status: 422 });
    const dueDate = new Date(body.dueDate);
    if (validator.default.isEmpty(body.dueDate || ""))
      return next({ message: "due date required", status: 422 });
      console.log(validator.default.isDate(body.dueDate))
    if (!moment(dueDate).isValid())
      return next({ message: "invalid due date", status: 422 });
    //   moment(Date.now()+100000).isAfter(Date.now());
    return next();
  } catch (error) {
      console.log(error);
    return next(error);
  }
};
