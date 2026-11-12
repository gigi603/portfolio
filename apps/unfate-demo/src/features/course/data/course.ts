// Content of the demo course, taken from the Unfate V2 Figma prototype
// (file "unfate", page "V2 · Écrans & prototype"). The product is in English.
import type { Chapter, Course, Lesson } from '../types'
import courseImage from '@/assets/images/course-defi.webp'
import teacher from '@/assets/images/teacher.webp'
import banner1 from '@/assets/images/banner-1.webp'
import banner2 from '@/assets/images/banner-2.webp'
import banner3 from '@/assets/images/banner-3.webp'
import banner4 from '@/assets/images/banner-4.webp'
import lessonLaptop from '@/assets/images/lesson-laptop.webp'
import lessonWatch from '@/assets/images/lesson-watch.webp'

export const course: Course = {
  id: 'defi',
  title: 'Basics of Decentralised Finance',
  level: 'Beginner',
  duration: '1h',
  price: 'FREE',
  image: courseImage,
  teacher,
  description: 'Learn how decentralised finance works, from blockchain basics to liquidity pools, lending and borrowing. Each chapter has 2 or 3 short lessons, and an exam closes the course.',
}

export const chapters: Chapter[] = [
  {
    title: 'DeFi vs. Traditional Finance',
    lessons: [
      {
        title: 'Blockchain technology',
        banner: banner1,
        blocks: [
          { type: 'heading', text: 'The rise of DeFi' },
          { type: 'paragraph', text: 'DeFi draws inspiration from blockchain, the technology behind the digital currency bitcoin, which allows several entities to hold a copy of a history of transactions, meaning it isn’t controlled by a single, central source. That’s important because centralized systems and human gatekeepers can limit the speed and sophistication of transactions while offering users less direct control over their money. DeFi is distinct because it expands the use of blockchain from simple value transfer to more complex financial use cases.' },
          { type: 'image', src: lessonLaptop, alt: 'A laptop on a living room table' },
          { type: 'heading', text: 'The goal of DeFi' },
          { type: 'paragraph', text: 'Bitcoin and many other digital-native assets stand out from legacy digital payment methods, such as those run by Visa and PayPal, in that they remove all middlemen from transactions. When you pay with a credit card for coffee at a cafe, a financial institution sits between you and the business, with control over the transaction, retaining the authority to stop or pause it and record it in its private ledger. With bitcoin, those institutions are cut out of the picture.' },
          { type: 'paragraph', text: 'Direct purchases aren’t the only type of transaction or contract overseen by big companies; financial applications such as loans, insurance, crowdfunding, derivatives, betting and more are also in their control. Cutting out middlemen from all kinds of transactions is one of the primary advantages of DeFi.' },
          { type: 'heading', text: 'Accessibility and transparency' },
          { type: 'paragraph', text: 'Before it was commonly known as decentralized finance, the idea of DeFi was often called “open finance.” DeFi improves upon legacy financial systems and creates financial infrastructure that is accessible to anyone in the world with an internet connection. Today many of these new financial experiments are built on top of the Ethereum blockchain.' },
          { type: 'image', src: lessonWatch, alt: 'Someone checking a smartwatch' },
          { type: 'paragraph', text: 'Most applications that call themselves “DeFi” are built on top of Ethereum, the world’s second-largest cryptocurrency platform, which sets itself apart from the Bitcoin platform in that it’s easier to use to build other types of decentralized applications beyond simple transactions. These more complex financial use cases were even highlighted by Ethereum creator Vitalik Buterin back in 2013 in the original Ethereum white paper.' },
        ],
      },
      {
        title: 'The failures of traditional finance',
        banner: banner2,
        blocks: [
          { type: 'heading', text: 'Why look at traditional finance?' },
          { type: 'paragraph', text: 'Before seeing what DeFi changes, it helps to see where today’s financial system falls short. It works well for many people, but it is often slow, expensive and closed to a large part of the world. This lesson covers its four main weak points: access, cost, speed and trust.' },
          { type: 'table', caption: 'Traditional finance in numbers', head: ['', 'The problem', 'In practice'], rows: [
            ['Access', 'Opening an account requires ID, an address and sometimes a minimum balance', '1.3 billion adults still have no bank account (World Bank, 2025)'],
            ['Cost', 'Each intermediary takes a fee', 'Sending $200 abroad costs 6.5% on average'],
            ['Speed', 'International transfers go through several banks', '1 to 5 business days to arrive'],
            ['Opening hours', 'Many payments stop at night, on weekends and on holidays', 'A transfer sent on Friday evening often arrives on Monday'],
            ['Transparency', 'Banks keep private ledgers', 'You only see your own statement'],
          ] },
          { type: 'heading', text: 'Too many people are left out' },
          { type: 'paragraph', text: 'According to the World Bank’s Global Findex 2025, 1.3 billion adults have no account at a bank or mobile money provider. Most of them are women, people on low incomes or people who live far from a bank branch. Without an account, it is hard to save safely, borrow money or receive a salary.' },
          { type: 'heading', text: 'Slow and expensive payments' },
          { type: 'paragraph', text: 'An international transfer often passes through several correspondent banks. Each one checks the payment, adds a delay and takes a fee. Sending $200 abroad still costs about 6.5% on average, more than twice the 3% target the G20 set for 2030. Families who send money home are the ones who pay the most.' },
          { type: 'heading', text: 'Trust in a few institutions' },
          { type: 'paragraph', text: 'In 2008, the American bank Lehman Brothers collapsed and the crisis spread worldwide. Banks had taken risks that savers could not see, and governments used public money to rescue them. A bank can also freeze an account, block a payment or refuse a loan without explaining why.' },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['1.3 billion adults have no bank account.', 'Cross-border payments are slow and cost about 6.5% on average.', 'The system relies on a few institutions you cannot check yourself.', 'DeFi tries to answer these problems. The next lesson shows how, and at what cost.'] },
        ],
      },
      {
        title: 'DeFi advantages and challenges',
        banner: banner3,
        blocks: [
          { type: 'box', tone: 'blue', title: 'Quick recap', text: 'In Blockchain technology, you saw the main promise of DeFi: no middlemen, and financial services open to anyone with an internet connection. This lesson looks at what that changes in practice, and at the risks that come with it.' },
          { type: 'heading', text: 'What DeFi does better' },
          { type: 'list', items: ['Always open: DeFi apps run 24 hours a day, 7 days a week, with no closing time.', 'Fast settlement: a transfer on a blockchain arrives in seconds or minutes, anywhere in the world.', 'Transparent: every transaction and every smart contract can be checked on the blockchain by anyone.', 'You stay in control: your assets stay in your own wallet, not in a bank account.', 'Building blocks: DeFi apps connect to each other, so a token from one app can be used in another.'] },
          { type: 'heading', text: 'The challenges' },
          { type: 'paragraph', text: 'DeFi is still young, and its risks are real. In 2025, about $3.4 billion in crypto was stolen in hacks, according to Chainalysis. A single attack on the Bybit exchange took $1.5 billion. Without a bank in the middle, there is no one to refund you if something goes wrong.' },
          { type: 'table', caption: 'Main risks and how to limit them', head: ['', 'What it means', 'How to protect yourself'], rows: [
            ['Hacks and bugs', 'A flaw in a smart contract can be used to drain the funds', 'Use well-known protocols that have been audited'],
            ['Scams', 'Fake tokens, phishing sites and projects that vanish with the money', 'Use bookmarked links and check contract addresses'],
            ['No safety net', 'No deposit guarantee and no customer service. A lost seed phrase means lost funds', 'Back up your seed phrase offline and never share it'],
            ['Volatility', 'Crypto prices can fall sharply within hours', 'Only use money you can afford to lose'],
            ['Regulation', 'Rules differ between countries and are still changing', 'Check what applies where you live'],
            ['Ease of use', 'Wallets, gas fees and approvals are hard for beginners', 'Start with small amounts, as in the practice steps'],
          ] },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['DeFi is open 24/7, fast, transparent and keeps you in control of your assets.', 'In exchange, you carry the risk yourself: no bank and no refund.', 'Use known protocols, check every link and start small.'] },
        ],
      },
    ],
  },
  {
    title: 'Yield Farming',
    lessons: [
      {
        title: 'APR vs APY',
        banner: banner4,
        blocks: [
          { type: 'heading', text: 'What is Yield Farming?' },
          { type: 'paragraph', text: 'Yield farming is one of the hottest trends in the decentralized finance world. It offers investors rewards for locking up their crypto holdings in a DeFi market. At its core, yield farming is a process that allows cryptocurrency holders to earn rewards on their holdings. With yield farming, an investor deposits units of a cryptocurrency into a lending protocol to earn interest from trading fees. Some users are also rewarded with additional yields from the protocol’s governance token.' },
          { type: 'heading', text: 'Understanding liquidity pools, liquidity providers and automated market maker model' },
          { type: 'paragraph', text: 'Yield farming works with a liquidity provider and a liquidity pool (a smart contract filled with cash) that powers a DeFi market. A liquidity provider is an investor who deposits funds into a smart contract. Yield farming functions based on the automated market maker (AMM) model.' },
          { type: 'paragraph', text: 'This model is popular on decentralized exchanges. AMM eliminates the conventional order book, which contains all “buy” and “sell” orders on a cryptocurrency exchange. Instead of stating the price that an asset is set to trade at, an AMM creates liquidity pools using smart contracts. These pools execute trades based on predetermined algorithms. DeFi users pay trading fees to the marketplace; the marketplace shares the fees with LPs based on their share of the pool’s liquidity.' },
          { type: 'heading', text: 'APR vs APY: reading the yield' },
          { type: 'paragraph', text: 'Yield farming platforms show what you can earn as a yearly percentage. Two numbers are used, and they are not the same. APR (annual percentage rate) is the simple yearly rate, without compounding. APY (annual percentage yield) includes compounding: the rewards you earn are added back and start earning rewards too.' },
          { type: 'table', caption: 'Same rate, different result', head: ['', 'APR', 'APY'], rows: [
            ['What it measures', 'Simple yearly rate', 'Yearly rate with compounding'],
            ['Rewards reinvested?', 'No', 'Yes, automatically or by you'],
            ['15% on $10,000', '$1,500 after one year', 'About $1,608 if compounded every month'],
            ['Where you see it', 'Lending and borrowing', 'Yield farming and staking'],
          ] },
          { type: 'box', tone: 'yellow', title: 'Before you trust a yield', items: ['Compare the same number: convert APR to APY before comparing two platforms.', 'Check the reward token: many yields are paid in the protocol’s own token, and its price can fall.', 'Very high yields usually mean very high risk, and they rarely last.'] },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['APR ignores compounding, APY includes it.', 'The more often rewards are compounded, the higher the APY.', 'A yield is only an estimate: it changes with the market and with the price of the reward token.'] },
        ],
      },
      {
        title: 'Impermanent loss',
        banner: banner1,
        blocks: [
          { type: 'heading', text: 'What is impermanent loss?' },
          { type: 'paragraph', text: 'When you deposit two tokens in a liquidity pool, the pool keeps their total value balanced. If the price of one token changes, traders rebalance the pool: you end up with more of the token that fell and less of the token that rose. Impermanent loss is the difference between what your share of the pool is worth and what your tokens would be worth if you had simply kept them in your wallet.' },
          { type: 'heading', text: 'A simple example' },
          { type: 'paragraph', text: 'Alice deposits 1 ETH and 100 USDC when 1 ETH is worth 100 USDC, so $200 in total. ETH then rises to 400 USDC. Traders rebalance the pool, and Alice’s share is now 0.5 ETH and 200 USDC, worth $400. If she had kept her 1 ETH and 100 USDC in her wallet, she would have $500. The $100 difference is her impermanent loss, before trading fees.' },
          { type: 'table', caption: 'How big is the loss?', head: ['Price change', 'Loss vs holding', 'What it means'], rows: [
            ['1.25×', 'About 0.6%', 'Small moves cost little'],
            ['1.5×', 'About 2%', 'Trading fees often cover it'],
            ['2×', 'About 5.7%', 'Fees may not cover it'],
            ['3×', 'About 13.4%', 'A large loss'],
            ['5×', 'About 25.5%', 'A quarter of the value'],
          ] },
          { type: 'heading', text: 'Why “impermanent”?' },
          { type: 'paragraph', text: 'The loss only becomes real when you withdraw. If prices come back to where they were when you deposited, the loss disappears. It works in both directions: a price drop causes the same loss as a price rise of the same size. The trading fees earned by the pool can offset part or all of it.' },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['Impermanent loss happens when the prices of the two tokens in a pool move apart.', 'The bigger the move, the bigger the loss, whether prices go up or down.', 'Pools of two stablecoins, such as USDC and DAI, have very little impermanent loss.'] },
        ],
      },
    ],
  },
  {
    title: 'Decentralised Exchanges',
    lessons: [
      {
        title: 'How a DEX works',
        banner: banner3,
        blocks: [
          { type: 'heading', text: 'What is a decentralized exchange?' },
          { type: 'paragraph', text: 'A decentralized exchange (DEX) lets you swap one token for another directly from your own wallet. No company holds your funds, there is no account to open and no identity check: the trade is executed by smart contracts on the blockchain. Uniswap, Curve and PancakeSwap are well-known DEXs. To use one, you connect a wallet such as MetaMask, choose the tokens to swap and confirm the transaction.' },
          { type: 'table', caption: 'Centralized vs decentralized exchange', head: ['', 'Centralized (CEX)', 'Decentralized (DEX)'], rows: [
            ['Who holds your funds', 'The exchange', 'You, in your wallet'],
            ['Account', 'Sign-up and ID check (KYC)', 'Just a wallet'],
            ['How prices are set', 'Order book: buyers meet sellers', 'Liquidity pools and a formula (AMM)'],
            ['Fees', 'Trading fee set by the exchange', 'Network gas fee + pool fee'],
            ['Main risk', 'Hack or failure of the company', 'Smart contract bugs and your own mistakes'],
          ] },
          { type: 'heading', text: 'How a swap works' },
          { type: 'paragraph', text: 'Most DEXs do not match buyers and sellers. You trade against a liquidity pool, a reserve of two tokens funded by other users. A formula sets the price from the amounts in the pool, so the price moves as you trade. You will see how pools work in detail in the Liquidity Pools chapter. Every swap is a blockchain transaction. You pay a network fee (gas) to the validators, plus a small swap fee that goes to the people who provide liquidity.' },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['A DEX lets you trade from your own wallet, with no account and no middleman.', 'Prices come from liquidity pools and a formula, not from an order book.', 'Every swap costs a network fee (gas) plus a small pool fee.', 'The next lesson shows how to swap safely.'] },
        ],
      },
      {
        title: 'Swapping safely',
        banner: banner2,
        blocks: [
          { type: 'heading', text: 'Price impact and slippage' },
          { type: 'paragraph', text: 'The bigger your trade compared with the size of the pool, the more it moves the price: this is price impact. While your transaction is waiting to be confirmed, other trades can also move the price: this is slippage. Your DEX lets you set a slippage tolerance, for example 0.5% or 1%. If the price moves more than that, the swap is cancelled and you only pay the network fee.' },
          { type: 'box', tone: 'blue', title: 'Before you confirm a swap', items: ['Price impact: how much your trade moves the price. Above 1%, think twice.', 'Slippage tolerance: the largest price change you accept while the transaction is pending. If the price moves more, the swap is cancelled.', 'Minimum received: the least you will get. Check it every time.'] },
          { type: 'heading', text: 'Risks to know' },
          { type: 'list', items: ['Fake tokens: anyone can create a token with a famous name. Always check the contract address on a trusted source such as CoinGecko.', 'Bots and front-running: some bots spot your pending trade and trade just before you to profit from the price move. A low slippage tolerance limits the damage.', 'Token approvals: the first time you swap a token, you allow the DEX to spend it. Prefer limited amounts and revoke approvals you no longer need.', 'Phishing: use bookmarked official links, never a link from an ad or a direct message.'] },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['Check the price impact and the minimum received before every swap.', 'Keep a low slippage tolerance to limit losses to bots.', 'Self-custody means self-responsibility: check tokens, links and approvals.'] },
        ],
      },
    ],
  },
  {
    title: 'Liquidity Pools',
    lessons: [
      {
        title: 'How a liquidity pool works',
        banner: banner1,
        blocks: [
          { type: 'heading', text: 'What is a liquidity pool?' },
          { type: 'paragraph', text: 'A liquidity pool is a smart contract that holds two tokens side by side, for example ETH and USDC. On a traditional exchange, a buyer has to wait for a seller in an order book. In a pool, traders swap directly against the tokens already deposited, at any time of day or night.' },
          { type: 'paragraph', text: 'The people who fill the pool are called liquidity providers (LPs). They deposit an equal value of both tokens and receive LP tokens in return: a digital receipt that proves their share of the pool.' },
          { type: 'poolFlow' },
          { type: 'heading', text: 'How prices are set: the automated market maker' },
          { type: 'paragraph', text: 'Most pools use an automated market maker (AMM): a formula replaces the order book. The classic one, made popular by Uniswap, is x × y = k. x and y are the amounts of each token in the pool, and k must stay the same after every trade.' },
          { type: 'paragraph', text: 'When you buy ETH from an ETH/USDC pool, you take ETH out and put USDC in. ETH becomes scarcer in the pool, so its price goes up. The bigger your trade compared with the size of the pool, the more the price moves. This is called price impact, and it is why deep pools give traders better prices.' },
          { type: 'box', tone: 'blue', title: 'Worked example', text: 'A pool holds 10 ETH and 20,000 USDC, so k = 200,000 and 1 ETH is worth about 2,000 USDC. You buy 1 ETH. The pool must keep 9 ETH × 22,222 USDC = 200,000, so you pay about 2,222 USDC before fees: 11% more than the displayed price, because your trade is large for this small pool.' },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['A liquidity pool is a smart contract holding two tokens that anyone can trade against.', 'You trade against the pool, not against another person.', 'The x × y = k formula sets the price: big trades in small pools move it a lot.'] },
        ],
      },
      {
        title: 'Providing liquidity',
        banner: banner4,
        blocks: [
          { type: 'heading', text: 'How liquidity providers earn' },
          { type: 'paragraph', text: 'Every swap pays a small fee to the pool, often 0.3% on classic pools. Some pools charge 0.05% for stable pairs or 1% for very volatile ones. Fees stay inside the pool, so each LP token is worth a little more after every trade. When you withdraw, your LP tokens are burned and you get back your share of both tokens, fees included. Some protocols add extra rewards in their own token: this is the yield farming you saw in chapter 2.' },
          { type: 'heading', text: 'Risks to know before you provide liquidity' },
          { type: 'list', items: ['Impermanent loss: if one token’s price moves a lot compared with the other, the pool rebalances automatically. You end up with more of the token that fell and less of the one that rose, worth less than if you had simply held them.', 'Smart contract risk: a bug or a hack in the pool’s code can drain funds. Prefer audited, well-established protocols.', 'Unknown tokens: in a new pool with little liquidity, the creator can withdraw everything (a “rug pull”) and leave LPs with worthless tokens.'] },
          { type: 'table', caption: 'Impermanent loss compared with simply holding', head: ['Price of one token changes by', 'Loss vs holding'], rows: [['× 1.25', '0.6%'], ['× 1.5', '2.0%'], ['× 2', '5.7%'], ['× 3', '13.4%'], ['× 5', '25.5%']] },
          { type: 'paragraph', text: 'The loss stays “impermanent” while prices can still return to where they were. It becomes real when you withdraw. Trading fees can make up for it in busy pools.' },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['LP tokens are your receipt: they prove your share of the pool.', 'Trading fees stay in the pool and are shared between LPs.', 'LPs take on impermanent loss and smart contract risk.', 'Stablecoin pairs (USDC/DAI) carry little impermanent loss, but usually earn less.'] },
        ],
      },
    ],
  },
  {
    title: 'Borrowing and Saving',
    lessons: [
      {
        title: 'Saving in DeFi',
        banner: banner3,
        blocks: [
          { type: 'heading', text: 'Saving in DeFi: supplying to a lending pool' },
          { type: 'paragraph', text: 'Lending protocols such as Aave or Compound work like a shared pot of money run by smart contracts. Savers supply tokens to the pool and start earning interest right away. In return they receive a token that represents their deposit, for example aUSDC on Aave, whose balance grows as interest is paid. There is no lock-up period: you can withdraw whenever you want, as long as enough of the pool has not been lent out at that moment.' },
          { type: 'box', tone: 'blue', title: 'Who pays whom', text: 'Savers supply USDC to the lending pool and receive aUSDC. Borrowers deposit ETH as collateral and borrow USDC. Borrowers pay interest to the pool, and the pool passes it on to savers.' },
          { type: 'heading', text: 'Where does the interest come from?' },
          { type: 'paragraph', text: 'The interest savers earn is paid by borrowers. No bank sets the rate: an algorithm adjusts it to the pool’s utilisation, the share of deposits that is currently borrowed. When most of the pool is borrowed, rates rise. This attracts new savers and encourages borrowers to repay. When little is borrowed, rates fall. That is why DeFi savings rates change from day to day.' },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['Savers supply tokens to a lending pool and receive a token, such as aUSDC, that grows with interest.', 'The interest is paid by borrowers, not by a bank.', 'Rates move with utilisation: more borrowing means higher rates.', 'You can withdraw at any time, as long as enough of the pool is not borrowed.'] },
        ],
      },
      {
        title: 'Borrowing safely',
        banner: banner2,
        blocks: [
          { type: 'heading', text: 'Borrowing: always more collateral than debt' },
          { type: 'paragraph', text: 'DeFi has no credit check and no bank behind you. To borrow, you first deposit collateral worth more than your loan: loans are over-collateralised. Each asset has a maximum loan-to-value (LTV). With an 80% LTV, $10,000 of ETH lets you borrow up to $8,000 of stablecoins. Why borrow rather than sell? To get cash without giving up an asset you want to keep.' },
          { type: 'heading', text: 'Health factor and liquidation' },
          { type: 'paragraph', text: 'The health factor tells you how safe your loan is: Health factor = (collateral value × liquidation threshold) ÷ amount borrowed. Above 1, you are safe. Below 1, your position can be liquidated: anyone can repay part of your debt and receive some of your collateral at a discount, called the liquidation bonus. You keep the rest, but the collateral you lose does not come back.' },
          { type: 'box', tone: 'blue', title: 'Worked example', text: 'You deposit $10,000 of ETH (liquidation threshold 80%) and borrow $6,000 of USDC. Health factor = 10,000 × 0.8 ÷ 6,000 = 1.33. If ETH falls by 25%, your collateral is worth $7,500 and the health factor drops to 1.0: liquidation can start.' },
          { type: 'heading', text: 'Good habits when you borrow' },
          { type: 'list', items: ['Keep a buffer: aim for a health factor well above 1, for example 1.5 or more.', 'Watch the price of your collateral: a 20 to 30% drop can happen in a single day.', 'Variable rates can rise quickly. Check what your loan costs every week.', 'Repay or add collateral before you get close to 1, not after.', 'Use audited, well-known protocols and start with small amounts.'] },
          { type: 'box', tone: 'green', title: 'Key takeaways', items: ['Every loan is over-collateralised, within a maximum LTV.', 'A health factor below 1 triggers liquidation.', 'Keep a safe buffer, such as 1.5, and watch the price of your collateral.'] },
        ],
      },
    ],
  },
]

const WORDS_PER_MINUTE = 130

function readingMinutes(lesson: Chapter['lessons'][number]): number {
  const text = lesson.blocks
    .map(block => {
      switch (block.type) {
        case 'heading':
        case 'paragraph':
          return block.text
        case 'list':
          return block.items.join(' ')
        case 'table':
          return block.rows.flat().join(' ')
        case 'box':
          return [block.text ?? '', ...(block.items ?? [])].join(' ')
        default:
          return ''
      }
    })
    .join(' ')
  return Math.max(3, Math.round(text.split(/\s+/).length / WORDS_PER_MINUTE))
}

/** Every lesson of the course in order, with its global index (0 to 10) */
export const lessons: Lesson[] = chapters.flatMap((chapter, chapterIndex) =>
  chapter.lessons.map(lesson => ({ ...lesson, chapter: chapterIndex, index: 0, minutes: readingMinutes(lesson) })),
).map((lesson, index) => ({ ...lesson, index }))

export function lessonsOfChapter(chapterIndex: number): Lesson[] {
  return lessons.filter(lesson => lesson.chapter === chapterIndex)
}
