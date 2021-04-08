import axios from 'axios';

const EnvelopeGroupService = {

  async getEnvelopeGroups(budgetMonthId) {
    console.log('[EnvelopeGroupService] [getEnvelopeGroups] Getting budgetMonths...');
    try {
      const res = await axios.get('/api/v1/envelope-groups?budgetMonthId='+budgetMonthId);
      console.log('[EnvelopeGroupService] [getEnvelopeGroups] Done: ' + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log('[EnvelopeGroupService] [getEnvelopeGroups] Error: ' + err);
      return null;
    } 
  }

};

export default EnvelopeGroupService;
