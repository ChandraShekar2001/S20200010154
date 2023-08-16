const axios = require("axios");

exports.numbers = async (req, res) => {
  try {
    const regexPattern = /^(http|https):\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+$/;

    const query  = req.query;
    const {url} = query;
    url.push("www")
    console.log(url);
    const filteredUrl = [];
    for(let i = 0; i < url.length; i++){
        if(regexPattern.test(url[i])){
            filteredUrl.push(url[i]);
        }
    }


    
    res.status(200).json({
        status: "success",
        filteredUrl
    });
  } catch (error) {}
};
