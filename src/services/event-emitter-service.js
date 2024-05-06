const sendMessage = async (channel) => {
    channel.emit('data', "data1");
    await new Promise(r => setTimeout(r, 2000));
    channel.emit('data', "data2");
    await new Promise(r => setTimeout(r, 2000));
    channel.emit('data', "data3");
    await new Promise(r => setTimeout(r, 2000));
    channel.emit('emitselesai');
    return
}

export default {
    sendMessage
}