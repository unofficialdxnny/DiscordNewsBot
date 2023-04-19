const Discord = require('discord.js');
const NewsAPI = require('newsapi');

const client = new Discord.Client();
const newsapi = new NewsAPI('YOUR_NEWSAPI_API_KEY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  // Ignore messages sent by the bot itself
  if (message.author.bot) return;

  // Check if the message starts with the !news command
  if (message.content.startsWith('!news')) {
    // Get the search query from the message
    const query = message.content.substring(6).trim();

    // Fetch the news articles from the NewsAPI
    const articles = await newsapi.v2.everything({
      q: query,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 5
    });

    // Send the news articles to the Discord channel
    for (const article of articles.articles) {
      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(article.title)
        .setURL(article.url)
        .setDescription(article.description)
        .setImage(article.urlToImage)
        .setTimestamp(article.publishedAt)
        .setFooter('Powered by NewsAPI');

      message.channel.send(embed);
    }
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
