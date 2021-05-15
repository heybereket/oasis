"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiData = void 0;
const emoji_json_1 = __importDefault(require("emoji-datasource-twitter/emoji.json"));
const emojiData = () => {
    const filteredEmoji = emoji_json_1.default.filter((e) => e.has_img_twitter == true);
    return filteredEmoji.map((item) => {
        return {
            // name: item.name,
            // short_name: item.short_name,
            short: item.short_names,
            img: item.image,
        };
    });
};
exports.emojiData = emojiData;
