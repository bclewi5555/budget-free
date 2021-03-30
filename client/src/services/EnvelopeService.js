import axios from 'axios';

const EnvelopeService = {

  async getEnvelopes(budgetMonthId) {
    console.log('[EnvelopeService] [getEnvelopes] Getting envelopes...');
    try {
      const res = await axios.get('/api/v1/envelope?budgetMonthId='+budgetMonthId);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log('[EnvelopeService] [getEnvelopes] Error: ' + err);
      return null;
    } 
  }

};

export default EnvelopeService;
