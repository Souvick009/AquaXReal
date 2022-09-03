module.exports = async (message, toSend, reply, ephemeral) => {
    var m;
    if (message.type == "APPLICATION_COMMAND") {
        if (!toSend.ephemeral) {
            if (toSend.embeds && !toSend.components) {
                m = await message.reply({
                    embeds: toSend.embeds,
                    fetchReply: true
                })
            }
            if (!toSend.embeds) {
                m =  await message.reply({
                    content: toSend.content,
                    fetchReply: true
                })
            }
            if (toSend.components && toSend.embeds) {
                m = await message.reply({
                    components: toSend.components,
                    embeds: toSend.embeds,
                    fetchReply: true
                })
            }
        } else {
            if (toSend.embeds && !toSend.components) {
                m = await message.reply({
                    embeds: toSend.embeds,
                    ephemeral: true
                })

            }
            if (!toSend.embeds) {
                m = await message.reply({
                    content: toSend.content,
                    ephemeral: true

                })
            }
            if (toSend.components && toSend.embeds) {
                m = await message.reply({
                    components: toSend.components,
                    embeds: toSend.embeds,
                    ephemeral: true

                })
            }
        }
    } else {
        if (toSend.embeds && !toSend.components) {
            if (reply) {
                m = await message.reply({
                    embeds: toSend.embeds,
                    fetchReply: true
                })

            } else {
                m = await message.channel.send({
                    embeds: toSend.embeds,
                    fetchReply: true
                })
                // console.log(m)

            }
        }
        if (!toSend.embeds) {
            if (reply) {
                m = await message.reply(toSend.content)
            } else {
                m = await message.channel.send(toSend.content)
            }
        }
        if (toSend.components && toSend.embeds) {
            // console.log(toSend.components[0].components)

            if (reply) {

                m = await message.reply({
                    components: toSend.components,
                    embeds: toSend.embeds
                })


            } else {

                m = await message.channel.send({
                    components: toSend.components,
                    embeds: toSend.embeds
                })
                // console.log(m)
            }
        }
    }
    return m;
}