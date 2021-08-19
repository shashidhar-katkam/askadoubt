






exports.createDoubt = async (doubtInfo) => {
    console.log(doubtInfo);
    return res.status(200).json({
        status: 'success',
        data: doubtInfo
    });
}