"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiData = void 0;
const emoji_json_1 = __importDefault(require("emoji-datasource-twitter/emoji.json"));
const emojiData = () => {
    const filteredEmoji = emoji_json_1.default.filter((e) => e.has_img_twitter == true);
    const data = filteredEmoji.map((item) => {
        return {
            short: item.short_names,
            img: item.image,
        };
    });
    let names = [];
    data.forEach((item) => names.push(item.short));
    return {
        data,
        names: names.flat(),
    };
};
exports.emojiData = emojiData;
