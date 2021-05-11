import emoji from 'emoji-datasource-twitter/emoji.json';

export const emojiData = () => {
  const filteredEmoji = emoji.filter((e) => e.has_img_twitter == true);
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
