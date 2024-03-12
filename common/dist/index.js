"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogBody = exports.createBlogBody = exports.singinBody = exports.singupBody = void 0;
const zod_1 = __importDefault(require("zod"));
exports.singupBody = zod_1.default.object({
    username: zod_1.default.string(),
    email: zod_1.default.string().email().optional(),
    password: zod_1.default.string().min(6)
});
exports.singinBody = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6)
});
exports.createBlogBody = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogBody = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
