import axios from 'axios';

const TransactionService = {

  async getTransactions(envelopeId) {
    console.log('[TransactionService] [getTransactions] Getting transactions...');
    try {
      const res = await axios.get('/api/v1/transactions?envelopeId='+envelopeId);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log('[TransactionService] [getTransactions] Error: ' + err);
      return null;
    } 
  }

};

export default TransactionService;
