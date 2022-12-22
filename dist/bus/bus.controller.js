"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bus_entity_1 = require("./bus.entity");
const bus_service_1 = require("./bus.service");
let BusController = class BusController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return this.service.getAll();
    }
    getById(parametre) {
        let busId = this.service.getById(+parametre.id);
        if (busId === undefined || busId === null) {
            throw new common_1.HttpException('Could not find a user with the id ${parametre.id}', 404);
        }
        return busId;
    }
    create(input) {
        return this.service.create(input.ligne, input.longitude, input.latitude);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], BusController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiTags)('Get'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", bus_entity_1.Bus)
], BusController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiTags)('Création'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The user has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", bus_entity_1.Bus)
], BusController.prototype, "create", null);
BusController = __decorate([
    (0, common_1.Controller)('bus'),
    __metadata("design:paramtypes", [bus_service_1.BusService])
], BusController);
exports.BusController = BusController;
//# sourceMappingURL=bus.controller.js.map