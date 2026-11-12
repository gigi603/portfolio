// 10 exam questions written from the course lessons. Each right answer is worth 10 points.
export interface Question {
  text: string
  answers: string[]
  /** Index of the right answer */
  correct: number
}

export const PASS_MARK = 80
export const POINTS_PER_QUESTION = 10

export const questions: Question[] = [
  { text: 'Where does DeFi draw its inspiration from?', answers: ['Blockchain', 'Cloud computing', 'The web', 'Fintech apps'], correct: 0 },
  { text: 'What is a decentralized exchange (DEX)?', answers: ['A bank that trades crypto for you', 'An app that lets you swap tokens from your own wallet', 'A website that sells gift cards', 'A government crypto register'], correct: 1 },
  { text: 'What is the difference between APR and APY?', answers: ['APY includes compounding, APR does not', 'APR includes compounding, APY does not', 'They are exactly the same', 'APY is only used for loans'], correct: 0 },
  { text: 'How many adults still have no bank account, according to the World Bank (2025)?', answers: ['About 13 million', 'About 130 million', 'About 1.3 billion', 'About 13 billion'], correct: 2 },
  { text: 'In a liquidity pool, who do you trade against?', answers: ['Another person, through an order book', 'The pool of tokens deposited by liquidity providers', 'The DEX company', 'The validators of the network'], correct: 1 },
  { text: 'What does the formula x × y = k describe?', answers: ['The interest rate of a loan', 'The price curve of a classic automated market maker', 'The gas fee of a transaction', 'The number of LP tokens you receive'], correct: 1 },
  { text: 'When does impermanent loss become real?', answers: ['As soon as you deposit', 'When you withdraw from the pool', 'Every time someone swaps', 'Never'], correct: 1 },
  { text: 'What does a slippage tolerance do?', answers: ['It cancels the swap if the price moves more than you accept', 'It lowers the gas fee', 'It hides your trade from bots completely', 'It guarantees the best price on the market'], correct: 0 },
  { text: 'Who pays the interest that savers earn on a lending protocol?', answers: ['The protocol’s founders', 'A central bank', 'Borrowers', 'Validators'], correct: 2 },
  { text: 'What happens when your health factor drops below 1?', answers: ['Your interest rate is frozen', 'Nothing, it is only an indicator', 'Your loan is cancelled and fully refunded', 'Your position can be liquidated'], correct: 3 },
]
