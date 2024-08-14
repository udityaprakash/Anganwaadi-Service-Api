const axios = require('axios');
require('dotenv').config();


const sendNotificationToAll = async (message, playerIds) => {
    const notificationData = {
      app_id: process.env.ONESIGNAL_APP_ID,
      contents: { en: message != '' ? message : 'You have new Notification. Click to View!' },
      include_player_ids: playerIds,
      // included_segments: ['All'],
      headings: { en: 'Anganwadi Suuchna' },
      content_available: true,
      data:{
        PushTitle: 'You have 1 New Message',
      }
    };
  
    try {
      const response = await axios.post('https://onesignal.com/api/v1/notifications', notificationData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.response ? error.response.data : error.message, err:error };
    }
  };

  module.exports = { sendNotificationToAll };