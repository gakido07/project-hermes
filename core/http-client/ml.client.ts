import axios from 'axios';

export class MlClient {
  private readonly axios = axios.create({
    baseURL: process.env.ML_API,
  });
  async evaluateSimilarity(text1: string, text2: string, data?: any) {
    return this.axios.post('/', {
      text1,
      text2,
      ...data,
    });
  }

  async evaluateSimilarityWithArray(body: any[]) {
    return this.axios.post('/', body);
  }
}
