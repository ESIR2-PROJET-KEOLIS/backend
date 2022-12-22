"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
class Position {
    Position(long, lat) {
        this.longitude = long;
        this.latitude = lat;
    }
    SetPosition(long, lat) {
        this.longitude = long;
        this.latitude = lat;
    }
    GetPosition() {
        return this;
    }
}
exports.Position = Position;
//# sourceMappingURL=position.entity.js.map