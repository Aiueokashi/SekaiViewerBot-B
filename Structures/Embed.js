function EmbedToPage(message, pages, paging = false, trash = false) {
  
    let isJSON = true;

    let i = 0;
    
    try{
      paging && pages.map( (x, pi) => x.footer ? x.footer = { text: `${x.footer} | ${++pi} / ${Object.keys(pages).length}` } : x.footer = { text: `${++pi} / ${Object.keys(pages).length}` } );
    }catch(e){
      isJSON = false;
      paging && pages.toJSON().map( (x, pi) => x.footer ? x.footer = { text: `${x.footer} | ${++pi} / ${Object.keys(pages).length}` } : x.footer = { text: `${++pi} / ${Object.keys(pages).length}` } );
    }
    message.channel.send(isJSON ? {embed: pages[i]} : {embed: pages[i].toJSON()}).then( async (msg) => {

        await msg.react("⬅️");

        const backFilter = (reaction) => reaction.emoji.name === "⬅️";
        const backCollector = msg.createReactionCollector(backFilter, { time: 900000 });

        await msg.react("➡️");

        const nextFilter = (reaction) => reaction.emoji.name === "➡️";
        const nextCollector = msg.createReactionCollector(nextFilter, { time: 900000 });

        backCollector.on("collect", (r) => {

            i > 0 && msg.edit(isJSON ? {embed: pages[--i]} : {embed: pages[--i].toJSON()});
            r.users.remove(r.users.cache.filter(u => u === message.author).first());

        });

        backCollector.on("end", () => msg.reactions.removeAll().catch(() => {}));

        nextCollector.on("collect", (r) => {

            i < Object.keys(pages).length + 1 && msg.edit(isJSON ? {embed: pages[++i]} : {embed: pages[++i].toJSON()});
            r.users.remove(r.users.cache.filter((u) => u === message.author).first());

        });

        if (trash) {

            await msg.react("🗑");

            const trashFilter = (reaction) => reaction.emoji.name === "🗑"
                , trashCollector = msg.createReactionCollector(trashFilter, { time: 900000 });

            trashCollector.on("collect", (r) => msg.delete({ timeout: 0 }));
        }

    });

}

module.exports = EmbedToPage;