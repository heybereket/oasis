"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiData = void 0;
const emoji_json_1 = __importDefault(require("emoji-datasource-twitter/emoji.json"));
const EmojiData = () => {
    const filteredEmoji = emoji_json_1.default.filter((e) => e.has_img_twitter == true);
    return filteredEmoji.map((item) => {
        return {
            // name: item.name,
            // short_name: item.short_name,
            short_names: item.short_names,
            image: item.image,
        };
    });
};
exports.EmojiData = EmojiData;
