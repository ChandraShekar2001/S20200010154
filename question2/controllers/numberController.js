const axios = require("axios");

exports.numbers = async (req, res) => {
  try {
    const regexPattern = /^http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/numbers\/\w+$/;

    const query  = req.query;
    const {url} = query;

    const filteredUrl = [];
    for(let i = 0; i < url.length; i++){
        if(regexPattern.test(url[i])){
            filteredUrl.push(url[i]);
        }
    }
    let raw = [];
    for(let i = 0; i < filteredUrl.length; i++){
        let {data} = await axios.get(filteredUrl[i]);
        console.log(data.numbers);  
        raw = [...raw, ...data.numbers];
    }
    raw = [...new Set(raw)];
    raw.sort((a, b) => a - b);
    
    res.status(200).json({
        numbers: raw,
    });
  } catch (error) {
    res.status(500).json({
        status: "fail",
        message: error.message,
    });
  }
};
