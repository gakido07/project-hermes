import axiosLib from 'axios';

export class MlApi {
  private readonly axios = axiosLib.create({
    baseURL: process.env.ML_API_BASE_URL,
    headers: {
      'x-api-key': process.env.ML_API_KEY,
    },
  });

  async getTextSimilarity(text1: string, text2: string) {
    return this.axios.get('/', {
      params: {
        text1,
        text2,
      },
    });
  }
}
