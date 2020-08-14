const mongoose = require("mongoose");
const Joi = require("@hapi/joi")

let tasksSchema = mongoose.Schema({
  info: {
    type:String,
    required:true,
    minLength:2,
    maxLength:999
    },
    cat: {
    type:String,
    required:true,
    minLength:2,
    maxLength:99
    },
    date:{type:Date,default:Date.now()}

  })
  
  exports.tasksModel = mongoose.model("tasks",tasksSchema);
  
  const validTasks = (_tasks) => {
    let JoiSchema = Joi.object({
      id:Joi.string(),
      info:Joi.string().min(2).max(999).required(),
      cat:Joi.string().min(2).max(99).required(),
    
    })
  
    return JoiSchema.validate(_tasks);
  }

  exports.validTasks = validTasks;