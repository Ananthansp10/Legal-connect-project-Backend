"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
  constructor(model) {
    this._model = model;
  }
  findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this._model.findOne({ email: email });
    });
  }
  findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this._model.findById(id);
    });
  }
  findAll(startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = yield this._model.find().skip(startIndex).limit(limit);
      const totalData = (yield this._model.countDocuments()) || 0;
      return { data, totalData };
    });
  }
  findAllUnverifiedLawyer() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this._model.find({
        verified: false,
        reason: { $exists: false },
      });
    });
  }
}
exports.BaseRepository = BaseRepository;
