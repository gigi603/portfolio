// Exam question bank: 10 questions per chapter, 50 in total, written only from the lesson texts.
// Every question exists in English and French, with the answers in the same order in both languages.
// The exam asks all of them, in a new random order each time (see stores/exam.ts).
import type { Locale } from '@/shared/i18n'

export interface Question {
  /** Index of the chapter the question comes from (0 to 4) */
  chapter: number
  /** Index of the right answer in `answers` (same in both languages) */
  correct: number
  text: Record<Locale, string>
  answers: Record<Locale, string[]>
}

/** Score out of 100 needed to pass and get the certificate */
export const PASS_MARK = 80
export const QUESTIONS_PER_CHAPTER = 10

export const questions: Question[] = [
  // Chapter 1 · DeFi vs. Traditional Finance
  {
    chapter: 0,
    correct: 0,
    text: { en: 'Where does DeFi draw its inspiration from?', fr: 'D’où la DeFi tire-t-elle son inspiration ?' },
    answers: {
      en: ['Blockchain', 'Cloud computing', 'Online banking', 'Fintech apps'],
      fr: ['De la blockchain', 'Du cloud computing', 'De la banque en ligne', 'Des applis fintech'],
    },
  },
  {
    chapter: 0,
    correct: 1,
    text: { en: 'What does a blockchain allow?', fr: 'Que permet une blockchain ?' },
    answers: {
      en: ['A single bank to control every transaction', 'Several entities to hold a copy of a history of transactions', 'Governments to cancel any payment', 'Anyone to change past transactions'],
      fr: ['À une seule banque de contrôler toutes les transactions', 'À plusieurs entités de détenir une copie d’un historique de transactions', 'Aux États d’annuler n’importe quel paiement', 'À n’importe qui de modifier les transactions passées'],
    },
  },
  {
    chapter: 0,
    correct: 2,
    text: { en: 'What was DeFi often called before it was known as decentralised finance?', fr: 'Comment appelait-on souvent la DeFi avant qu’on parle de finance décentralisée ?' },
    answers: {
      en: ['Smart banking', 'Digital finance', 'Open finance', 'Web banking'],
      fr: ['La banque intelligente', 'La finance numérique', 'La finance ouverte', 'La banque web'],
    },
  },
  {
    chapter: 0,
    correct: 1,
    text: { en: 'On which blockchain are most DeFi applications built?', fr: 'Sur quelle blockchain la plupart des applications DeFi sont-elles construites ?' },
    answers: {
      en: ['Bitcoin', 'Ethereum', 'A private bank ledger', 'The Visa network'],
      fr: ['Bitcoin', 'Ethereum', 'Un registre bancaire privé', 'Le réseau Visa'],
    },
  },
  {
    chapter: 0,
    correct: 3,
    text: { en: 'Who highlighted complex financial use cases in the original Ethereum white paper in 2013?', fr: 'Qui a mis en avant des usages financiers complexes dans le livre blanc original d’Ethereum en 2013 ?' },
    answers: {
      en: ['The World Bank', 'Visa', 'The G20', 'Vitalik Buterin'],
      fr: ['La Banque mondiale', 'Visa', 'Le G20', 'Vitalik Buterin'],
    },
  },
  {
    chapter: 0,
    correct: 2,
    text: { en: 'How many adults have no bank account, according to the World Bank (2025)?', fr: 'Combien d’adultes n’ont pas de compte bancaire, selon la Banque mondiale (2025) ?' },
    answers: {
      en: ['About 13 million', 'About 130 million', 'About 1.3 billion', 'About 13 billion'],
      fr: ['Environ 13 millions', 'Environ 130 millions', 'Environ 1,3 milliard', 'Environ 13 milliards'],
    },
  },
  {
    chapter: 0,
    correct: 2,
    text: { en: 'On average, how much does it cost to send $200 abroad?', fr: 'En moyenne, combien coûte l’envoi de 200 $ à l’étranger ?' },
    answers: {
      en: ['About 0.5%', 'About 3%', 'About 6.5%', 'About 15%'],
      fr: ['Environ 0,5 %', 'Environ 3 %', 'Environ 6,5 %', 'Environ 15 %'],
    },
  },
  {
    chapter: 0,
    correct: 0,
    text: { en: 'How long can an international bank transfer take to arrive?', fr: 'Combien de temps un virement bancaire international peut-il mettre à arriver ?' },
    answers: {
      en: ['1 to 5 business days', 'A few seconds', 'Exactly one hour', 'Two months'],
      fr: ['1 à 5 jours ouvrés', 'Quelques secondes', 'Une heure tout juste', 'Deux mois'],
    },
  },
  {
    chapter: 0,
    correct: 1,
    text: { en: 'Which American bank collapsed in 2008 and spread the crisis worldwide?', fr: 'Quelle banque américaine a fait faillite en 2008, propageant la crise au monde entier ?' },
    answers: {
      en: ['PayPal', 'Lehman Brothers', 'The World Bank', 'Visa'],
      fr: ['PayPal', 'Lehman Brothers', 'La Banque mondiale', 'Visa'],
    },
  },
  {
    chapter: 0,
    correct: 3,
    text: { en: 'In DeFi, who refunds you if something goes wrong?', fr: 'Dans la DeFi, qui vous rembourse si quelque chose tourne mal ?' },
    answers: {
      en: ['Your bank', 'The government', 'The app’s customer service', 'No one: you carry the risk yourself'],
      fr: ['Votre banque', 'L’État', 'Le service client de l’application', 'Personne : vous portez le risque vous-même'],
    },
  },

  // Chapter 2 · Yield Farming
  {
    chapter: 1,
    correct: 1,
    text: { en: 'What is yield farming?', fr: 'Qu’est-ce que le yield farming ?' },
    answers: {
      en: ['Mining new bitcoins with powerful computers', 'Locking up crypto in a DeFi market to earn rewards', 'Buying shares in a farming company', 'Lending money to a traditional bank'],
      fr: ['Miner de nouveaux bitcoins avec des ordinateurs puissants', 'Bloquer des cryptos dans un marché DeFi pour gagner des récompenses', 'Acheter des actions d’une entreprise agricole', 'Prêter de l’argent à une banque traditionnelle'],
    },
  },
  {
    chapter: 1,
    correct: 0,
    text: { en: 'On which model does yield farming work?', fr: 'Sur quel modèle repose le yield farming ?' },
    answers: {
      en: ['The automated market maker (AMM)', 'The order book', 'Credit scoring', 'Fixed bank rates'],
      fr: ['Le teneur de marché automatisé (AMM)', 'Le carnet d’ordres', 'Le scoring de crédit', 'Les taux bancaires fixes'],
    },
  },
  {
    chapter: 1,
    correct: 2,
    text: { en: 'What is the difference between APR and APY?', fr: 'Quelle est la différence entre l’APR et l’APY ?' },
    answers: {
      en: ['APR includes compounding, APY does not', 'They are exactly the same', 'APY includes compounding, APR does not', 'APY is only used for loans'],
      fr: ['L’APR inclut les intérêts composés, pas l’APY', 'Ils sont exactement identiques', 'L’APY inclut les intérêts composés, pas l’APR', 'L’APY ne sert que pour les prêts'],
    },
  },
  {
    chapter: 1,
    correct: 1,
    text: { en: 'You earn 15% APR on $10,000. How much do you earn after one year?', fr: 'Vous gagnez 15 % d’APR sur 10 000 $. Combien gagnez-vous au bout d’un an ?' },
    answers: {
      en: ['$150', '$1,500', '$1,608', '$15,000'],
      fr: ['150 $', '1 500 $', '1 608 $', '15 000 $'],
    },
  },
  {
    chapter: 1,
    correct: 3,
    text: { en: 'What happens to the APY when rewards are compounded more often?', fr: 'Que devient l’APY quand les récompenses sont composées plus souvent ?' },
    answers: {
      en: ['It goes down', 'It stays the same', 'It becomes an APR', 'It goes up'],
      fr: ['Il baisse', 'Il reste le même', 'Il devient un APR', 'Il augmente'],
    },
  },
  {
    chapter: 1,
    correct: 0,
    text: { en: 'What should you do before comparing the yields of two platforms?', fr: 'Que faut-il faire avant de comparer les rendements de deux plateformes ?' },
    answers: {
      en: ['Convert APR to APY so you compare the same number', 'Pick the highest number shown', 'Ignore the reward token', 'Compare their number of users'],
      fr: ['Convertir l’APR en APY pour comparer le même chiffre', 'Choisir le chiffre le plus élevé', 'Ignorer le token de récompense', 'Comparer leur nombre d’utilisateurs'],
    },
  },
  {
    chapter: 1,
    correct: 2,
    text: { en: 'What do very high yields usually mean?', fr: 'Que signifient en général des rendements très élevés ?' },
    answers: {
      en: ['No risk at all', 'A guaranteed profit', 'Very high risk, and they rarely last', 'A bank is backing the platform'],
      fr: ['Aucun risque', 'Un profit garanti', 'Un risque très élevé, et ils durent rarement', 'Une banque soutient la plateforme'],
    },
  },
  {
    chapter: 1,
    correct: 1,
    text: { en: 'When does impermanent loss become real?', fr: 'Quand la perte impermanente devient-elle réelle ?' },
    answers: {
      en: ['As soon as you deposit', 'When you withdraw from the pool', 'Every time someone swaps', 'Never'],
      fr: ['Dès le dépôt', 'Au moment où vous retirez vos fonds du pool', 'À chaque échange', 'Jamais'],
    },
  },
  {
    chapter: 1,
    correct: 2,
    text: { en: 'Alice deposits 1 ETH and 100 USDC when 1 ETH is worth 100 USDC. ETH rises to 400 USDC. What is her impermanent loss, before fees?', fr: 'Alice dépose 1 ETH et 100 USDC quand 1 ETH vaut 100 USDC. L’ETH monte à 400 USDC. Quelle est sa perte impermanente, avant frais ?' },
    answers: {
      en: ['$0', '$50', '$100', '$400'],
      fr: ['0 $', '50 $', '100 $', '400 $'],
    },
  },
  {
    chapter: 1,
    correct: 3,
    text: { en: 'Which pools have very little impermanent loss?', fr: 'Quels pools ont très peu de perte impermanente ?' },
    answers: {
      en: ['Pools with a brand-new token', 'Pools of very volatile tokens', 'Any pool that contains ETH', 'Pools of two stablecoins, such as USDC and DAI'],
      fr: ['Les pools avec un tout nouveau token', 'Les pools de tokens très volatils', 'Tous les pools qui contiennent de l’ETH', 'Les pools de deux stablecoins, comme USDC et DAI'],
    },
  },

  // Chapter 3 · Decentralised Exchanges
  {
    chapter: 2,
    correct: 2,
    text: { en: 'What does a decentralised exchange (DEX) let you do?', fr: 'Que vous permet une plateforme d’échange décentralisée (DEX) ?' },
    answers: {
      en: ['Open a bank account online', 'Borrow without any collateral', 'Swap tokens directly from your own wallet', 'Leave your funds with a company'],
      fr: ['Ouvrir un compte bancaire en ligne', 'Emprunter sans aucune garantie', 'Échanger des tokens directement depuis votre propre wallet', 'Confier vos fonds à une entreprise'],
    },
  },
  {
    chapter: 2,
    correct: 0,
    text: { en: 'Which of these is a well-known DEX?', fr: 'Lequel de ces noms est un DEX connu ?' },
    answers: {
      en: ['Uniswap', 'Visa', 'PayPal', 'Lehman Brothers'],
      fr: ['Uniswap', 'Visa', 'PayPal', 'Lehman Brothers'],
    },
  },
  {
    chapter: 2,
    correct: 1,
    text: { en: 'On a DEX, who holds your funds?', fr: 'Sur un DEX, qui détient vos fonds ?' },
    answers: {
      en: ['The exchange', 'You, in your wallet', 'A partner bank', 'The validators'],
      fr: ['La plateforme', 'Vous, dans votre wallet', 'Une banque partenaire', 'Les validateurs'],
    },
  },
  {
    chapter: 2,
    correct: 3,
    text: { en: 'What do you need to use a DEX?', fr: 'De quoi avez-vous besoin pour utiliser un DEX ?' },
    answers: {
      en: ['A sign-up and an ID check', 'A bank account', 'A minimum balance', 'Just a wallet'],
      fr: ['D’une inscription et d’une vérification d’identité', 'D’un compte bancaire', 'D’un solde minimum', 'D’un simple wallet'],
    },
  },
  {
    chapter: 2,
    correct: 1,
    text: { en: 'How are prices set on most DEXs?', fr: 'Comment les prix sont-ils fixés sur la plupart des DEX ?' },
    answers: {
      en: ['By an order book where buyers meet sellers', 'By liquidity pools and a formula (AMM)', 'By a central bank', 'By the company that runs the DEX'],
      fr: ['Par un carnet d’ordres où les acheteurs rencontrent les vendeurs', 'Par des pools de liquidité et une formule (AMM)', 'Par une banque centrale', 'Par l’entreprise qui gère le DEX'],
    },
  },
  {
    chapter: 2,
    correct: 0,
    text: { en: 'What does a swap on a DEX cost?', fr: 'Que coûte un échange sur un DEX ?' },
    answers: {
      en: ['A network gas fee plus a small pool fee', 'Nothing at all', 'A monthly subscription', 'Only a bank transfer fee'],
      fr: ['Des frais de gas du réseau plus de petits frais de pool', 'Rien du tout', 'Un abonnement mensuel', 'Seulement des frais de virement bancaire'],
    },
  },
  {
    chapter: 2,
    correct: 2,
    text: { en: 'What is slippage?', fr: 'Qu’est-ce que le slippage ?' },
    answers: {
      en: ['The fee paid to validators', 'The loss you make when you withdraw', 'A price change while your transaction is waiting to be confirmed', 'The price of gas'],
      fr: ['Les frais payés aux validateurs', 'La perte subie au moment du retrait', 'Une variation de prix pendant que votre transaction attend d’être confirmée', 'Le prix du gas'],
    },
  },
  {
    chapter: 2,
    correct: 3,
    text: { en: 'What happens if the price moves more than your slippage tolerance?', fr: 'Que se passe-t-il si le prix bouge plus que votre tolérance de slippage ?' },
    answers: {
      en: ['The swap goes through at any price', 'The DEX pays you the difference', 'Your fees are doubled', 'The swap is cancelled and you only pay the network fee'],
      fr: ['L’échange passe à n’importe quel prix', 'Le DEX vous verse la différence', 'Vos frais sont doublés', 'L’échange est annulé et vous ne payez que les frais de réseau'],
    },
  },
  {
    chapter: 2,
    correct: 1,
    text: { en: 'How can you avoid buying a fake token?', fr: 'Comment éviter d’acheter un faux token ?' },
    answers: {
      en: ['Trust the token’s name', 'Check the contract address on a trusted source such as CoinGecko', 'Click the link in an ad', 'Buy the newest token first'],
      fr: ['Faire confiance au nom du token', 'Vérifier l’adresse du contrat sur une source fiable comme CoinGecko', 'Cliquer sur le lien d’une publicité', 'Acheter d’abord le token le plus récent'],
    },
  },
  {
    chapter: 2,
    correct: 0,
    text: { en: 'What limits the damage from front-running bots?', fr: 'Qu’est-ce qui limite les dégâts des bots de front-running ?' },
    answers: {
      en: ['A low slippage tolerance', 'A high slippage tolerance', 'Bigger trades', 'More token approvals'],
      fr: ['Une tolérance de slippage basse', 'Une tolérance de slippage élevée', 'Des échanges plus gros', 'Plus d’autorisations de tokens'],
    },
  },

  // Chapter 4 · Liquidity Pools
  {
    chapter: 3,
    correct: 3,
    text: { en: 'What is a liquidity pool?', fr: 'Qu’est-ce qu’un pool de liquidité ?' },
    answers: {
      en: ['A bank savings account', 'An order book', 'A personal wallet', 'A smart contract that holds two tokens side by side'],
      fr: ['Un compte d’épargne bancaire', 'Un carnet d’ordres', 'Un wallet personnel', 'Un smart contract qui contient deux tokens côte à côte'],
    },
  },
  {
    chapter: 3,
    correct: 1,
    text: { en: 'In a liquidity pool, who do you trade against?', fr: 'Dans un pool de liquidité, contre qui échangez-vous ?' },
    answers: {
      en: ['Another person, through an order book', 'The tokens already deposited in the pool', 'The company behind the DEX', 'The validators of the network'],
      fr: ['Une autre personne, via un carnet d’ordres', 'Les tokens déjà déposés dans le pool', 'L’entreprise derrière le DEX', 'Les validateurs du réseau'],
    },
  },
  {
    chapter: 3,
    correct: 2,
    text: { en: 'What do liquidity providers receive when they deposit?', fr: 'Que reçoivent les fournisseurs de liquidité quand ils déposent ?' },
    answers: {
      en: ['A bank card', 'Nothing until they withdraw', 'LP tokens, a receipt that proves their share of the pool', 'A fixed monthly salary'],
      fr: ['Une carte bancaire', 'Rien avant leur retrait', 'Des LP tokens, un reçu qui prouve leur part du pool', 'Un salaire mensuel fixe'],
    },
  },
  {
    chapter: 3,
    correct: 0,
    text: { en: 'What does the formula x × y = k describe?', fr: 'Que décrit la formule x × y = k ?' },
    answers: {
      en: ['The price curve of a classic automated market maker', 'The interest rate of a loan', 'The gas fee of a transaction', 'The number of LP tokens you receive'],
      fr: ['La courbe de prix d’un teneur de marché automatisé classique', 'Le taux d’intérêt d’un prêt', 'Les frais de gas d’une transaction', 'Le nombre de LP tokens que vous recevez'],
    },
  },
  {
    chapter: 3,
    correct: 3,
    text: { en: 'You buy ETH from an ETH/USDC pool. What happens to the price of ETH in that pool?', fr: 'Vous achetez de l’ETH dans un pool ETH/USDC. Que devient le prix de l’ETH dans ce pool ?' },
    answers: {
      en: ['It goes down', 'It stays the same', 'A bank sets it', 'It goes up'],
      fr: ['Il baisse', 'Il reste le même', 'Une banque le fixe', 'Il monte'],
    },
  },
  {
    chapter: 3,
    correct: 1,
    text: { en: 'Why do deep pools give traders better prices?', fr: 'Pourquoi les pools profonds donnent-ils de meilleurs prix aux traders ?' },
    answers: {
      en: ['They have no fees', 'The same trade moves the price less', 'A bank guarantees them', 'Validators give them a discount'],
      fr: ['Ils n’ont pas de frais', 'Le même échange fait moins bouger le prix', 'Une banque les garantit', 'Les validateurs leur font une remise'],
    },
  },
  {
    chapter: 3,
    correct: 0,
    text: { en: 'What swap fee do classic pools often charge?', fr: 'Quels frais d’échange les pools classiques prennent-ils souvent ?' },
    answers: {
      en: ['0.3%', '3%', '6.5%', '25%'],
      fr: ['0,3 %', '3 %', '6,5 %', '25 %'],
    },
  },
  {
    chapter: 3,
    correct: 3,
    text: { en: 'Where do the trading fees of a pool go?', fr: 'Où vont les frais de trading d’un pool ?' },
    answers: {
      en: ['To a bank', 'They are burned', 'To the wallet maker', 'They stay in the pool and are shared between liquidity providers'],
      fr: ['À une banque', 'Ils sont détruits', 'Au fabricant du wallet', 'Ils restent dans le pool et sont partagés entre les fournisseurs de liquidité'],
    },
  },
  {
    chapter: 3,
    correct: 1,
    text: { en: 'What is a “rug pull”?', fr: 'Qu’est-ce qu’un « rug pull » ?' },
    answers: {
      en: ['A sudden price rise', 'The creator of a new pool withdraws everything and leaves worthless tokens', 'A normal withdrawal from a pool', 'A type of gas fee'],
      fr: ['Une hausse soudaine du prix', 'Le créateur d’un nouveau pool retire tout et laisse des tokens sans valeur', 'Un retrait normal d’un pool', 'Un type de frais de gas'],
    },
  },
  {
    chapter: 3,
    correct: 2,
    text: { en: 'The price of one token in a pool doubles. What is the impermanent loss compared with simply holding?', fr: 'Le prix d’un des tokens d’un pool double. Quelle est la perte impermanente par rapport à la simple détention ?' },
    answers: {
      en: ['About 0.6%', 'About 2%', 'About 5.7%', 'About 25.5%'],
      fr: ['Environ 0,6 %', 'Environ 2 %', 'Environ 5,7 %', 'Environ 25,5 %'],
    },
  },

  // Chapter 5 · Borrowing and Saving
  {
    chapter: 4,
    correct: 1,
    text: { en: 'Which of these is a lending protocol?', fr: 'Lequel de ces noms est un protocole de prêt ?' },
    answers: {
      en: ['Uniswap', 'Aave', 'CoinGecko', 'MetaMask'],
      fr: ['Uniswap', 'Aave', 'CoinGecko', 'MetaMask'],
    },
  },
  {
    chapter: 4,
    correct: 0,
    text: { en: 'What do savers receive when they supply USDC on Aave?', fr: 'Que reçoivent les épargnants qui apportent de l’USDC sur Aave ?' },
    answers: {
      en: ['aUSDC, whose balance grows with interest', 'LP tokens', 'ETH', 'A bank card'],
      fr: ['De l’aUSDC, dont le solde grossit avec les intérêts', 'Des LP tokens', 'De l’ETH', 'Une carte bancaire'],
    },
  },
  {
    chapter: 4,
    correct: 2,
    text: { en: 'Who pays the interest that savers earn on a lending protocol?', fr: 'Qui paie les intérêts que touchent les épargnants sur un protocole de prêt ?' },
    answers: {
      en: ['The protocol’s founders', 'A central bank', 'Borrowers', 'Validators'],
      fr: ['Les fondateurs du protocole', 'Une banque centrale', 'Les emprunteurs', 'Les validateurs'],
    },
  },
  {
    chapter: 4,
    correct: 3,
    text: { en: 'What happens to rates when most of a lending pool is borrowed?', fr: 'Que deviennent les taux quand la majeure partie d’un pool de prêt est empruntée ?' },
    answers: {
      en: ['They fall', 'They are frozen', 'They stop being paid', 'They rise'],
      fr: ['Ils baissent', 'Ils sont gelés', 'Ils ne sont plus versés', 'Ils montent'],
    },
  },
  {
    chapter: 4,
    correct: 1,
    text: { en: 'When can savers withdraw their deposit?', fr: 'Quand les épargnants peuvent-ils retirer leur dépôt ?' },
    answers: {
      en: ['Only after a one-year lock-up', 'At any time, as long as enough of the pool is not borrowed', 'Only on weekdays', 'Only with a bank’s approval'],
      fr: ['Seulement après un blocage d’un an', 'À tout moment, tant qu’une part suffisante du pool n’est pas empruntée', 'Seulement en semaine', 'Seulement avec l’accord d’une banque'],
    },
  },
  {
    chapter: 4,
    correct: 0,
    text: { en: 'What must you deposit before you can borrow in DeFi?', fr: 'Que devez-vous déposer avant de pouvoir emprunter dans la DeFi ?' },
    answers: {
      en: ['Collateral worth more than your loan', 'An ID card and a payslip', 'Nothing', 'Collateral worth half your loan'],
      fr: ['Une garantie qui vaut plus que votre prêt', 'Une pièce d’identité et une fiche de paie', 'Rien', 'Une garantie qui vaut la moitié de votre prêt'],
    },
  },
  {
    chapter: 4,
    correct: 3,
    text: { en: 'With an 80% loan-to-value, how much can you borrow with $10,000 of ETH?', fr: 'Avec un LTV de 80 %, combien pouvez-vous emprunter avec 10 000 $ d’ETH ?' },
    answers: {
      en: ['$2,000', '$10,000', '$12,500', 'Up to $8,000'],
      fr: ['2 000 $', '10 000 $', '12 500 $', 'Jusqu’à 8 000 $'],
    },
  },
  {
    chapter: 4,
    correct: 2,
    text: { en: 'What happens when your health factor drops below 1?', fr: 'Que se passe-t-il quand votre facteur de santé passe sous 1 ?' },
    answers: {
      en: ['Your interest rate is frozen', 'Nothing, it is only an indicator', 'Your position can be liquidated', 'Your loan is cancelled and refunded'],
      fr: ['Votre taux d’intérêt est gelé', 'Rien, ce n’est qu’un indicateur', 'Votre position peut être liquidée', 'Votre prêt est annulé et remboursé'],
    },
  },
  {
    chapter: 4,
    correct: 2,
    text: { en: 'You deposit $10,000 of ETH (liquidation threshold 80%) and borrow $6,000. What is your health factor?', fr: 'Vous déposez 10 000 $ d’ETH (seuil de liquidation de 80 %) et empruntez 6 000 $. Quel est votre facteur de santé ?' },
    answers: {
      en: ['0.8', '1.0', '1.33', '1.67'],
      fr: ['0,8', '1,0', '1,33', '1,67'],
    },
  },
  {
    chapter: 4,
    correct: 3,
    text: { en: 'Which health factor gives you a safe buffer?', fr: 'Quel facteur de santé vous donne une marge de sécurité ?' },
    answers: {
      en: ['Exactly 1', '0.5', 'Just under 1', '1.5 or more'],
      fr: ['Exactement 1', '0,5', 'Juste en dessous de 1', '1,5 ou plus'],
    },
  },
]
