"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataService = /** @class */ (function () {
    //public notes: INote[] = [];
    function DataService(http) {
        this.http = http;
        this.url = 'api/notes';
    }
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data-service.js.map