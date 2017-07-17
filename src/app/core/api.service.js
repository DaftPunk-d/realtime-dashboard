"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var request = require("request");
var ApiService = (function () {
    function ApiService() {
        this.userId = 'R0MgwXPJnXPv3mq7';
    }
    ApiService.prototype.getFormIdentifiers = function () {
        var getFormUrl = environment_1.environment.dataUrl + "list/?user_id=" + this.userId;
        return this.getFromUrl(getFormUrl);
    };
    ApiService.prototype.getFormData = function (formIdentifier, offset, limit) {
        var getFormDataUrl = environment_1.environment.dataUrl + "get/?user_id=" + this.userId + "&form_identifier=" + formIdentifier + "&offset=" + offset + "&limit=" + limit;
        return this.getFromUrl(getFormDataUrl);
    };
    ApiService.prototype.getFromUrl = function (url) {
        return new Promise(function (resolve, reject) {
            request(url, { json: true }, function (error, response, body) {
                if (error) {
                    reject(error);
                    return;
                }
                if (response.statusCode >= 400) {
                    console.error(response.statusMessage, response);
                    reject(response);
                    return;
                }
                resolve(body);
            });
        });
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
