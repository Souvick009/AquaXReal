module.exports = async (message, toSend, ephemeral, channel) => {
    var m;
    if (message.type == 2) {
        if (!toSend.ephemeral) {
            if (toSend.embeds && !toSend.components) {
                if (message.deferred || message.replied) {
                    m = await message.editReply({
                        embeds: toSend.embeds,
                        fetchReply: true
                    })
                } else {
                    m = await message.reply({
                        embeds: toSend.embeds,
                        fetchReply: true
                    })
                }

                return m;
            }
            if (!toSend.embeds) {
                if (message.deferred || message.replied) {
                    m = await message.editReply({
                        content: toSend.content,
                        fetchReply: true
                    })
                } else {
                    m = await message.reply({
                        content: toSend.content,
                        fetchReply: true
                    })
                }

                return m;
            }
            if (toSend.components && toSend.embeds) {
                if (channel) {
                    m = await message.channel.send({
                        components: toSend.components,
                        embeds: toSend.embeds,
                        fetchReply: true
                    })
                } else {
                    if (message.deferred || message.replied) {
                        m = await message.editReply({
                            components: toSend.components,
                            embeds: toSend.embeds,
                            fetchReply: true
                        })
                    } else {
                        m = await message.reply({
                            components: toSend.components,
                            embeds: toSend.embeds,
                            fetchReply: true
                        })
                    }

                }
                return m;
            }
        } else {
            if (toSend.embeds && !toSend.components) {
                m = await message.reply({
                    embeds: toSend.embeds,
                    ephemeral: true
                })
                return m;
            }
            if (!toSend.embeds) {
                m = await message.reply({
                    content: toSend.content,
                    ephemeral: true
                })
                return m;
            }
            if (toSend.components && toSend.embeds) {
                if (channel) {
                    m = await message.channel.send({
                        components: toSend.components,
                        embeds: toSend.embeds,
                        ephemeral: true,
                        fetchReply: true
                    })
                } else {
                    m = await message.reply({
                        components: toSend.components,
                        embeds: toSend.embeds,
                        ephemeral: true,
                        fetchReply: true
                    })
                }
                return m;
            }
        }
    } else {
        if (toSend.embeds && !toSend.components) {

            m = await message.reply({
                embeds: toSend.embeds,
                fetchReply: true
            })
            return m;

        }
        if (!toSend.embeds) {

            m = await message.reply(toSend.content)

            return m;
        }
        if (toSend.components && toSend.embeds) {
            // console.log(toSend.components[0].components)

            m = await message.reply({
                components: toSend.components,
                embeds: toSend.embeds
            })
            return m;

        }
    }
    //return m;
}