const stream = async (res) => {
    res.write("stream1\n")
    await new Promise(r => setTimeout(r, 2000));
    res.write("stream2\n")
    await new Promise(r => setTimeout(r, 2000));
    res.write("stream3\n")
    await new Promise(r => setTimeout(r, 2000));
    return
}

export default {
    stream
}