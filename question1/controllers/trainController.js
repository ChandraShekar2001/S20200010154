const axios = require('axios');

exports.getTrainInfo = async(req, res) => {
    try {
        const {data} = await axios.post('http://20.244.56.144/train/auth', {
            "companyName": "ABC Company",
            "clientID": "ee465f24-5249-47be-bfa5-207dc5b715ad",
            "clientSecret": "eyeZGJRILIGUWhlr",
            "ownerName": "P chandra shekar",
            "ownerEmail": "venkatachandrashekar.pv@iiits.in",
            "rollNo": "S20200010154"
        });
        const {access_token} = data;

        const trainData = await axios.get('http://20.244.56.144/train/trains', {
            headers:{
                'Authorization': `Bearer ${access_token}`
            }
        });

        const trainInfo = trainData.data;
        const thirtyMinutesFromNow = new Date();
        thirtyMinutesFromNow.setMinutes(thirtyMinutesFromNow.getMinutes() + 30);
        
        const filteredTrains = trainInfo.filter(train => {
            const departureTime = new Date();
            departureTime.setHours(train.departureTime.Hours);
            departureTime.setMinutes(train.departureTime.Minutes);
            departureTime.setSeconds(train.departureTime.Seconds);
            departureTime.setMinutes(departureTime.getMinutes() + train.delayedBy);
        
            return departureTime > thirtyMinutesFromNow;
        });
        
        filteredTrains.sort((a, b) => {
            const aTotalTickets = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
            const bTotalTickets = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
        
            if (a.price.sleeper + a.price.AC !== b.price.sleeper + b.price.AC) {
                return a.price.sleeper + a.price.AC - b.price.sleeper - b.price.AC;
            }
        
            if (aTotalTickets !== bTotalTickets) {
                return bTotalTickets - aTotalTickets;
            }
        
            const aDepartureTimeWithDelay = (a.departureTime.Hours * 3600 + a.departureTime.Minutes * 60 + a.departureTime.Seconds) + (a.delayedBy * 60);
            const bDepartureTimeWithDelay = (b.departureTime.Hours * 3600 + b.departureTime.Minutes * 60 + b.departureTime.Seconds) + (b.delayedBy * 60);
        
            return bDepartureTimeWithDelay - aDepartureTimeWithDelay;
        });
        
        res.status(200).json({
            status: 'success',
            filteredTrains
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

