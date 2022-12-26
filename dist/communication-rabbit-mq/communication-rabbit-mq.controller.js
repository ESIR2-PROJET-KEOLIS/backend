"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationRabbitMqController = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
let CommunicationRabbitMqController = class CommunicationRabbitMqController {
    constructor() {
        this.childProcess = (0, child_process_1.fork)('receive.js');
    }
    onModuleInit() {
        process.on('message', (msg) => {
            console.log(`Message reçu : ${msg}`);
        });
    }
};
CommunicationRabbitMqController = __decorate([
    (0, common_1.Controller)('communication-rabbit-mq'),
    (0, common_1.Injectable)()
], CommunicationRabbitMqController);
exports.CommunicationRabbitMqController = CommunicationRabbitMqController;
//# sourceMappingURL=communication-rabbit-mq.controller.js.map