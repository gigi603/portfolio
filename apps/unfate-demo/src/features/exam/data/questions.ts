// Exam question bank: 10 questions per chapter, 50 in total, written only from the lesson texts.
// The exam asks all of them, in a new random order each time (see stores/exam.ts).
export interface Question {
  /** Index of the chapter the question comes from (0 to 4) */
  chapter: number
  text: string
  answers: string[]
  /** Index of the right answer in `answers` */
  correct: number
}

/** Score out of 100 needed to pass and get the certificate */
export const PASS_MARK = 80
export const QUESTIONS_PER_CHAPTER = 10

export const questions: Question[] = [
  // Chapter 1 · DeFi vs. Traditional Finance
  { chapter: 0, text: 'Where does DeFi draw its inspiration from?', answers: ['Blockchain', 'Cloud computing', 'Online banking', 'Fintech apps'], correct: 0 },
  { chapter: 0, text: 'What does a blockchain allow?', answers: ['A single bank to control every transaction', 'Several entities to hold a copy of a history of transactions', 'Governments to cancel any payment', 'Anyone to change past transactions'], correct: 1 },
  { chapter: 0, text: 'What was DeFi often called before it was known as decentralised finance?', answers: ['Smart banking', 'Digital finance', 'Open finance', 'Web banking'], correct: 2 },
  { chapter: 0, text: 'On which blockchain are most DeFi applications built?', answers: ['Bitcoin', 'Ethereum', 'A private bank ledger', 'The Visa network'], correct: 1 },
  { chapter: 0, text: 'Who highlighted complex financial use cases in the original Ethereum white paper in 2013?', answers: ['The World Bank', 'Visa', 'The G20', 'Vitalik Buterin'], correct: 3 },
  { chapter: 0, text: 'How many adults have no bank account, according to the World Bank (2025)?', answers: ['About 13 million', 'About 130 million', 'About 1.3 billion', 'About 13 billion'], correct: 2 },
  { chapter: 0, text: 'On average, how much does it cost to send $200 abroad?', answers: ['About 0.5%', 'About 3%', 'About 6.5%', 'About 15%'], correct: 2 },
  { chapter: 0, text: 'How long can an international bank transfer take to arrive?', answers: ['1 to 5 business days', 'A few seconds', 'Exactly one hour', 'Two months'], correct: 0 },
  { chapter: 0, text: 'Which American bank collapsed in 2008 and spread the crisis worldwide?', answers: ['PayPal', 'Lehman Brothers', 'The World Bank', 'Visa'], correct: 1 },
  { chapter: 0, text: 'In DeFi, who refunds you if something goes wrong?', answers: ['Your bank', 'The government', 'The app’s customer service', 'No one: you carry the risk yourself'], correct: 3 },

  // Chapter 2 · Yield Farming
  { chapter: 1, text: 'What is yield farming?', answers: ['Mining new bitcoins with powerful computers', 'Locking up crypto in a DeFi market to earn rewards', 'Buying shares in a farming company', 'Lending money to a traditional bank'], correct: 1 },
  { chapter: 1, text: 'On which model does yield farming work?', answers: ['The automated market maker (AMM)', 'The order book', 'Credit scoring', 'Fixed bank rates'], correct: 0 },
  { chapter: 1, text: 'What is the difference between APR and APY?', answers: ['APR includes compounding, APY does not', 'They are exactly the same', 'APY includes compounding, APR does not', 'APY is only used for loans'], correct: 2 },
  { chapter: 1, text: 'You earn 15% APR on $10,000. How much do you earn after one year?', answers: ['$150', '$1,500', '$1,608', '$15,000'], correct: 1 },
  { chapter: 1, text: 'What happens to the APY when rewards are compounded more often?', answers: ['It goes down', 'It stays the same', 'It becomes an APR', 'It goes up'], correct: 3 },
  { chapter: 1, text: 'What should you do before comparing the yields of two platforms?', answers: ['Convert APR to APY so you compare the same number', 'Pick the highest number shown', 'Ignore the reward token', 'Compare their number of users'], correct: 0 },
  { chapter: 1, text: 'What do very high yields usually mean?', answers: ['No risk at all', 'A guaranteed profit', 'Very high risk, and they rarely last', 'A bank is backing the platform'], correct: 2 },
  { chapter: 1, text: 'When does impermanent loss become real?', answers: ['As soon as you deposit', 'When you withdraw from the pool', 'Every time someone swaps', 'Never'], correct: 1 },
  { chapter: 1, text: 'Alice deposits 1 ETH and 100 USDC when 1 ETH is worth 100 USDC. ETH rises to 400 USDC. What is her impermanent loss, before fees?', answers: ['$0', '$50', '$100', '$400'], correct: 2 },
  { chapter: 1, text: 'Which pools have very little impermanent loss?', answers: ['Pools with a brand-new token', 'Pools of very volatile tokens', 'Any pool that contains ETH', 'Pools of two stablecoins, such as USDC and DAI'], correct: 3 },

  // Chapter 3 · Decentralised Exchanges
  { chapter: 2, text: 'What does a decentralised exchange (DEX) let you do?', answers: ['Open a bank account online', 'Borrow without any collateral', 'Swap tokens directly from your own wallet', 'Leave your funds with a company'], correct: 2 },
  { chapter: 2, text: 'Which of these is a well-known DEX?', answers: ['Uniswap', 'Visa', 'PayPal', 'Lehman Brothers'], correct: 0 },
  { chapter: 2, text: 'On a DEX, who holds your funds?', answers: ['The exchange', 'You, in your wallet', 'A partner bank', 'The validators'], correct: 1 },
  { chapter: 2, text: 'What do you need to use a DEX?', answers: ['A sign-up and an ID check', 'A bank account', 'A minimum balance', 'Just a wallet'], correct: 3 },
  { chapter: 2, text: 'How are prices set on most DEXs?', answers: ['By an order book where buyers meet sellers', 'By liquidity pools and a formula (AMM)', 'By a central bank', 'By the company that runs the DEX'], correct: 1 },
  { chapter: 2, text: 'What does a swap on a DEX cost?', answers: ['A network gas fee plus a small pool fee', 'Nothing at all', 'A monthly subscription', 'Only a bank transfer fee'], correct: 0 },
  { chapter: 2, text: 'What is slippage?', answers: ['The fee paid to validators', 'The loss you make when you withdraw', 'A price change while your transaction is waiting to be confirmed', 'The price of gas'], correct: 2 },
  { chapter: 2, text: 'What happens if the price moves more than your slippage tolerance?', answers: ['The swap goes through at any price', 'The DEX pays you the difference', 'Your fees are doubled', 'The swap is cancelled and you only pay the network fee'], correct: 3 },
  { chapter: 2, text: 'How can you avoid buying a fake token?', answers: ['Trust the token’s name', 'Check the contract address on a trusted source such as CoinGecko', 'Click the link in an ad', 'Buy the newest token first'], correct: 1 },
  { chapter: 2, text: 'What limits the damage from front-running bots?', answers: ['A low slippage tolerance', 'A high slippage tolerance', 'Bigger trades', 'More token approvals'], correct: 0 },

  // Chapter 4 · Liquidity Pools
  { chapter: 3, text: 'What is a liquidity pool?', answers: ['A bank savings account', 'An order book', 'A personal wallet', 'A smart contract that holds two tokens side by side'], correct: 3 },
  { chapter: 3, text: 'In a liquidity pool, who do you trade against?', answers: ['Another person, through an order book', 'The tokens already deposited in the pool', 'The company behind the DEX', 'The validators of the network'], correct: 1 },
  { chapter: 3, text: 'What do liquidity providers receive when they deposit?', answers: ['A bank card', 'Nothing until they withdraw', 'LP tokens, a receipt that proves their share of the pool', 'A fixed monthly salary'], correct: 2 },
  { chapter: 3, text: 'What does the formula x × y = k describe?', answers: ['The price curve of a classic automated market maker', 'The interest rate of a loan', 'The gas fee of a transaction', 'The number of LP tokens you receive'], correct: 0 },
  { chapter: 3, text: 'You buy ETH from an ETH/USDC pool. What happens to the price of ETH in that pool?', answers: ['It goes down', 'It stays the same', 'A bank sets it', 'It goes up'], correct: 3 },
  { chapter: 3, text: 'Why do deep pools give traders better prices?', answers: ['They have no fees', 'The same trade moves the price less', 'A bank guarantees them', 'Validators give them a discount'], correct: 1 },
  { chapter: 3, text: 'What swap fee do classic pools often charge?', answers: ['0.3%', '3%', '6.5%', '25%'], correct: 0 },
  { chapter: 3, text: 'Where do the trading fees of a pool go?', answers: ['To a bank', 'They are burned', 'To the wallet maker', 'They stay in the pool and are shared between liquidity providers'], correct: 3 },
  { chapter: 3, text: 'What is a “rug pull”?', answers: ['A sudden price rise', 'The creator of a new pool withdraws everything and leaves worthless tokens', 'A normal withdrawal from a pool', 'A type of gas fee'], correct: 1 },
  { chapter: 3, text: 'The price of one token in a pool doubles. What is the impermanent loss compared with simply holding?', answers: ['About 0.6%', 'About 2%', 'About 5.7%', 'About 25.5%'], correct: 2 },

  // Chapter 5 · Borrowing and Saving
  { chapter: 4, text: 'Which of these is a lending protocol?', answers: ['Uniswap', 'Aave', 'CoinGecko', 'MetaMask'], correct: 1 },
  { chapter: 4, text: 'What do savers receive when they supply USDC on Aave?', answers: ['aUSDC, whose balance grows with interest', 'LP tokens', 'ETH', 'A bank card'], correct: 0 },
  { chapter: 4, text: 'Who pays the interest that savers earn on a lending protocol?', answers: ['The protocol’s founders', 'A central bank', 'Borrowers', 'Validators'], correct: 2 },
  { chapter: 4, text: 'What happens to rates when most of a lending pool is borrowed?', answers: ['They fall', 'They are frozen', 'They stop being paid', 'They rise'], correct: 3 },
  { chapter: 4, text: 'When can savers withdraw their deposit?', answers: ['Only after a one-year lock-up', 'At any time, as long as enough of the pool is not borrowed', 'Only on weekdays', 'Only with a bank’s approval'], correct: 1 },
  { chapter: 4, text: 'What must you deposit before you can borrow in DeFi?', answers: ['Collateral worth more than your loan', 'An ID card and a payslip', 'Nothing', 'Collateral worth half your loan'], correct: 0 },
  { chapter: 4, text: 'With an 80% loan-to-value, how much can you borrow with $10,000 of ETH?', answers: ['$2,000', '$10,000', '$12,500', 'Up to $8,000'], correct: 3 },
  { chapter: 4, text: 'What happens when your health factor drops below 1?', answers: ['Your interest rate is frozen', 'Nothing, it is only an indicator', 'Your position can be liquidated', 'Your loan is cancelled and refunded'], correct: 2 },
  { chapter: 4, text: 'You deposit $10,000 of ETH (liquidation threshold 80%) and borrow $6,000. What is your health factor?', answers: ['0.8', '1.0', '1.33', '1.67'], correct: 2 },
  { chapter: 4, text: 'Which health factor gives you a safe buffer?', answers: ['Exactly 1', '0.5', 'Just under 1', '1.5 or more'], correct: 3 },
]
