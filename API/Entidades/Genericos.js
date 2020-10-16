class Generico {
   constructor(Ok = true, Status = 200, Message = "") {
      this.Ok = Ok;
      this.Status = Status;
      this.Message = Message;
      this.Data = undefined;
      this.InfoExtra = "";
      this.Extra = new Object();
   }

   set(Ok, Status = 200, Message = "") {
      this.Ok = Ok;
      this.Status = Status;
      this.Message = Message;

      return this;
   }
}

class DataBaseResult {
   constructor(Error = false, Data = []) {
      this.Error = Error;
      this.Data = Data;
      this.Message = "";
      this.ErrorCode = 0;
      this.Cant = 0;
      this.Output = {};
      this.RowsAffected = [];
   }

   set(Error = false, Data = []) {
      this.Error = Error;
      this.Data = Data;

      return this;
   }
}

module.exports = {
   Generico,
   DataBaseResult,
};
