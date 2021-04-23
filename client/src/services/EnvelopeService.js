import axios from 'axios';

const EnvelopeService = {

  async getEnvelopes(groupId) {
    console.log('[EnvelopeService] [getEnvelopes] Getting envelopes...');
    try {
      const res = await axios.get('/api/v1/envelopes?groupId='+groupId);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log('[EnvelopeService] [getEnvelopes] Error: ' + err);
      return null;
    } 
  }

};

export default EnvelopeService;
