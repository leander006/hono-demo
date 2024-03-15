"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var edge_1 = require("@prisma/client/edge");
var extension_accelerate_1 = require("@prisma/extension-accelerate");
var hono_1 = require("hono");
var jwt_1 = require("hono/jwt");
var blog_common_1 = require("@leander006/blog-common");
var blog = new hono_1.Hono();
blog.use('/*', function (c, next) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt, token, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                jwt = c.req.header('authorization');
                if (!jwt) {
                    c.status(404);
                    return [2 /*return*/, c.json("Add jwt token")];
                }
                token = jwt.split(' ')[1];
                return [4 /*yield*/, (0, jwt_1.verify)(token, c.env.JWT_SECRET)];
            case 1:
                user = _a.sent();
                c.set("userId", user.id);
                return [4 /*yield*/, next()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                c.status(403);
                console.log(error_1);
                return [2 /*return*/, c.json(error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); });
blog.get('/bulk', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, blogs, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.post.findMany({
                        select: {
                            content: true,
                            title: true,
                            id: true,
                            author: {
                                select: {
                                    username: true
                                }
                            }
                        }
                    })];
            case 2:
                blogs = _a.sent();
                console.log(blogs);
                c.status(200);
                return [2 /*return*/, c.json(blogs)];
            case 3:
                error_2 = _a.sent();
                c.status(404);
                return [2 /*return*/, c.json(error_2)];
            case 4: return [2 /*return*/];
        }
    });
}); });
blog.get('/:id', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, id, blog_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                id = c.req.param('id');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.post.findUnique({
                        select: {
                            title: true,
                            content: true,
                            published: true,
                            author: true
                        },
                        where: {
                            id: id
                        },
                    })];
            case 2:
                blog_1 = _a.sent();
                console.log(blog_1);
                c.status(200);
                return [2 /*return*/, c.json(blog_1)];
            case 3:
                error_3 = _a.sent();
                c.status(404);
                return [2 /*return*/, c.json(error_3)];
            case 4: return [2 /*return*/];
        }
    });
}); });
blog.post('/', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, body, success, blog_2, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                success = blog_common_1.createBlogBody.safeParse(body).success;
                console.log(success, " ", c.get("userId"));
                if (!success) {
                    c.status(403);
                    return [2 /*return*/, c.json({ message: "Inputs are incorrect" })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: body.title,
                            content: body.content,
                            authorId: c.get("userId"),
                        }
                    })];
            case 3:
                blog_2 = _a.sent();
                console.log(blog_2);
                c.status(200);
                return [2 /*return*/, c.json({ data: blog_2, message: "Blog created successfully" })];
            case 4:
                error_4 = _a.sent();
                c.status(404);
                console.log(error_4);
                return [2 /*return*/, c.json({ error: error_4 })];
            case 5: return [2 /*return*/];
        }
    });
}); });
blog.put('/:id', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, id, body, success, blog_3, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                id = c.req.param("id");
                return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                success = blog_common_1.updateBlogBody.safeParse(body).success;
                if (!success) {
                    c.status(403);
                    return [2 /*return*/, c.json({ message: "Inputs are incorrect" })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.post.update({
                        where: {
                            id: id,
                            authorId: c.get("userId")
                        },
                        data: {
                            title: body.title,
                            content: body.content
                        }
                    })];
            case 3:
                blog_3 = _a.sent();
                console.log(blog_3);
                c.status(200);
                return [2 /*return*/, c.json({ data: blog_3, message: "Blog updated successfully" })];
            case 4:
                error_5 = _a.sent();
                c.status(404);
                return [2 /*return*/, c.json({ error: error_5 })];
            case 5: return [2 /*return*/];
        }
    });
}); });
blog.delete("/:id", function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, id, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                id = c.req.param("id");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.post.delete({
                        where: {
                            id: id,
                        }
                    })];
            case 2:
                _a.sent();
                c.status(200);
                return [2 /*return*/, c.json({ message: "Blog deleted successfully" })];
            case 3:
                error_6 = _a.sent();
                c.status(404);
                return [2 /*return*/, c.json({ error: error_6 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = blog;
