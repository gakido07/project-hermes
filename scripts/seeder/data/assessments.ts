import { AssessmentEntity } from 'servers/theory-grader/src/assessment/entities/assesment.entity';
import { QuestionEntity } from 'servers/theory-grader/src/assessment/entities/question.entity';

export const AssessmentsSeedData: AssessmentEntity[] = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deadline: new Date(),
    name: 'How does Managerial Economics Differ from Economics?',
    organizerId: 1,
    questions: [],
    startTime: new Date(),
    key: '',
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    deadline: new Date(),
    name: '',
    organizerId: 2,
    questions: [
      {
        id: 1,
        number: 1,
        sampleAnswer:
          ' i. Whereas managerial economics involves application of economic principles to the problems of the firm, Economics deals with the body of the principles itself.\n' +
          '\n' +
          'ii. Whereas managerial economics is micro-economic in character economics is both macro-economic and micro-economic.\n' +
          '\n' +
          'iii. Managerial economics, though micro in character, deals only with the firm and has nothing to do with an individual’s economic problems. But micro economics as a branch of economics deals with both economics of the individual as well as economics of the firm.' +
          'Under micro-economics as a branch of economics, distribution theories, viz., wages, interest and profit, are also dealt with but in managerial economics, mainly, profit theory is used; other distribution theories are not used much in managerial economics, thus, the scope of economics is wider than that of managerial economics given the simplified model, whereas managerial economics modifies and enlarges it.\n' +
          '\n' +
          'v. Economic theory hypothesizes economic relationships and builds economic models but managerial economics adopts, modifies, and reformulates economic models to suit the specific conditions and serves the specific problem solving process. Thus, economics gives the simplified model, whereas managerial economics modifies and enlarges it.' +
          'vi. Economic theory makes certain assumptions whereas managerial economics introduces certain feedbacks on multi-product nature of manufacture, behavioral constraints, environmental aspects, legal constraints, constraints on resource availability, etc., thus, embodying a combination of certain complexities assumed away in economic theory and then attempts to solve the real-life, complex business probable with the aid of tool subjects, e.g., mathematics, statistics, econometrics, accounting, operations research, and so on.',
        score: 5,
        assessment: null,
        updatedAt: new Date(),
        createdAt: new Date(),
        answers: [],
        text: 'How does Managerial Economics Differ from Economics?',
      },
      {
        ...new QuestionEntity({
          number: 2,
          text: 'What are the types of demand determinants?',
          assessment: null,
          sampleAnswer:
            'Producers’ goods are also called as capital goods. These goods are used in the production of other goods. Machinery, tools and implements, factory buildings, etc. are some of the examples of capital goods.\n' +
            '\n' +
            'Consumers’ goods are those goods, which are used for final consumption. They satisfy the consumers’ wants directly. Examples of consumers’ goods can be ready-made clothes, prepared food, residential houses, etc. The differentiation between a consumer good and a capital good is based on the purpose for which it is used, rather than, the good itself. A loaf of bread used by a household is a consumer good, whereas used by a sweet shop is a producer good.\n' +
            '\n' +
            'Consumer goods are further classified as durable and non-durable goods. Examples of non-durable goods are sweets, bread, milk, a bottle of Coca-Cola, photoflash bulb, etc. They are also called single use goods. On the other hand, durable consumer goods are those which go on being used over a period of time, e.g., a car, a refrigerator, a ready-made shirt, an umbrella and an electric bulb.\n' +
            '\n' +
            'Of course, the lengths of time for which they can go on being used vary to a good deal. A shirt may last a year or two. A car or a refrigerator may provide fairly useful service for 10 to 15 years. Old furniture can go on being used almost indefinitely so long as it is properly looked after. Durable goods are necessarily durable but not all non-durable goods are perishable. For example, coal can be stored indefinitely.',
          score: 5,
        }),
      },
    ],
    startTime: new Date(),
    key: '',
  },
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deadline: new Date(),
    name: '',
    organizerId: 1,
    questions: [],
    startTime: new Date(),
    key: '',
  },
];
