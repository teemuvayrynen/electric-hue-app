const axios = require('axios')
const schedule = require('node-schedule')

const url = "http://192.168.68.104/api/HbbXmDZizgJxbK20VSvS9vqpd7iOANsudfarlvuM/lights/12/state"

const getData = async (link) => {
  const output = await axios.get(link)
  return output.data
}

const changeLighting = async (data) => {
  try {
    await axios.put(url, data)
  } catch (err) {
    console.log(err)
  }
  
}

const run = async () => {
  const d = new Date()
  const date = d.toISOString().split('T')[0];
  const hour = d.getHours()
  if (hour >= 10) {
    const result = await getData(`https://api.porssisahko.net/v1/price.json?date=${date}&hour=${hour}`)
    if (result.price < 4.0) {
      changeLighting({"on":true, "bri": 51, "xy": [
				0.3001,
				0.6023
			]})
    } else if (result.price >= 4.0 && result.price <= 7.0) {
      changeLighting({"on":true, "bri": 51, "xy": [
				0.4827,
				0.4652
			]})
    } else {
      changeLighting({"on":true, "bri": 51, "xy": [
				0.6798,
				0.3171
			]})
    }
  } else {
    changeLighting({"on":false})
  }
}

const job = schedule.scheduleJob('1 * * * *', run)