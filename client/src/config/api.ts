import axios from 'axios';
import {
  CreateAssessmentDto,
  CreateMultipleQuestionsDto,
  PaginationParams,
  RecordAnswerRequestDto,
} from '@projecthermes/core/dto';
import { BeginAttemptDto } from '@projecthermes/core/dto/begin.attempt.dto';
import { EndAssessmentDto } from '@projecthermes/core/dto/end.assessment.dto';

class Api {
  private readonly axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    validateStatus: status => status === 401 || (status >= 200 && status < 300),
  });
  constructor() {
    this.axios.interceptors.response.use(
      async response => {
        if (
          response.config.url.startsWith('/auth') &&
          response.status === 401
        ) {
          throw new Error('Invalid username or password');
        }
        if (
          !response.config.url.startsWith('/auth') &&
          response.status === 401
        ) {
          try {
            const { data } = await axios.post(
              `/auth/refresh-token`,
              {},
              {
                withCredentials: true,
              },
            );
            return axios(response.config);
          } catch (error) {
            localStorage.clear();
          }
        }
        return response;
      },
      error => {},
    );
  }

  getAssessmentById(id: string) {
    return this.axios.get(`/assessments/${id}`);
  }

  handleSuccessfulAuth(code: string) {
    return this.axios.get('/auth/google/register', {
      params: {
        code,
      },
    });
  }

  getAssessmentsByOrganizerId(params?: PaginationParams) {
    return this.axios.get('/assessments/organizer', {
      params,
    });
  }

  createAssessment(body: CreateAssessmentDto) {
    return this.axios.post('/assessments/', body);
  }

  loadAssessment(key: string, attemptId?: string) {
    return this.axios.get('/assessments/portal/attempt', {
      params: {
        key,
      },
    });
  }

  beginAttempt(key: string, body: BeginAttemptDto) {
    return this.axios.post(`assessments/portal/attempt`, body, {
      params: {
        key,
      },
    });
  }

  verifyAssessmentKey(key: string) {
    return this.axios.get('/assessments/verify/key', {
      params: {
        key,
      },
    });
  }

  recordAnswer(questionId: number, body: RecordAnswerRequestDto) {
    const { answerText: answer, matricNo, attemptId } = body;
    return this.axios.post(`assessments/questions/${questionId}`, body);
  }

  createQuestion(assessmentId: number, body: CreateMultipleQuestionsDto) {
    return this.axios.post(`/assessments/${assessmentId}/questions`, body);
  }

  finishAttempt(id: number, body: EndAssessmentDto) {
    return this.axios.post(`assessments/portal/attempt/${id}`, body);
  }

  getAssessmentAttempts(assessmentId: number) {
    return this.axios.get(`/assessments/${assessmentId}/attempts`);
  }
}

export const api = new Api();
