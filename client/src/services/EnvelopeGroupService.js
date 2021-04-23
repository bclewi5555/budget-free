import axios from 'axios';

const EnvelopeGroupService = {

  async getEnvelopeGroups(budgetMonthId) {
    console.log('[EnvelopeGroupService]  Getting groups...');
    try {
      const res = await axios.get('/api/v1/envelope-groups?budgetMonthId='+budgetMonthId);
      console.log('[EnvelopeGroupService]  Done: ' + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log('[EnvelopeGroupService] Error: ' + err);
      return null;
    } 
  },

    async createEnvelopeGroup(group) {
    console.log('[EnvelopeGroupService] Creating group...');
    try {
      const res = await axios.post('/api/v1/envelope-groups', {
        budgetMonthId: group.budgetMonthId,
        label: group.label
      });
      console.log('[EnvelopeGroupService] Done: ' + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log('[EnvelopeGroupService] Error: ' + err);
      return null;
    } 
  }

};

export default EnvelopeGroupService;
