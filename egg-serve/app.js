const { ImageClient } = require('image-node-sdk');
module.exports = app => {
  app.beforeStart(async () => {
    // let imgClient = new ImageClient(app.config.tengxunyun);
    // const groupIds = (await imgClient.faceGetGpIds({ data: {} })).body;
    // console.log(groupIds);
    // if(groupIds.data.group_ids.length===0){
    // }
  });
};
