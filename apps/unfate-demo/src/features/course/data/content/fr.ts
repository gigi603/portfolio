// Contenu du cours en français : traduction fidèle de en.ts (mêmes chapitres, mêmes leçons, même ordre).
import type { Chapter, CourseContent, CourseText } from '../../types'
import courseImage from '@/assets/images/course-defi.webp'
import teacher from '@/assets/images/teacher.webp'
import banner1 from '@/assets/images/banner-1.webp'
import banner2 from '@/assets/images/banner-2.webp'
import banner3 from '@/assets/images/banner-3.webp'
import banner4 from '@/assets/images/banner-4.webp'
import lessonLaptop from '@/assets/images/lesson-laptop.webp'
import lessonWatch from '@/assets/images/lesson-watch.webp'

const course: CourseText = {
  id: 'defi',
  title: 'Les bases de la finance décentralisée',
  level: 'Débutant',
  duration: '1h',
  price: 'GRATUIT',
  image: courseImage,
  teacher,
  description: 'Découvrez comment fonctionne la finance décentralisée, des bases de la blockchain aux pools de liquidité, au prêt et à l’emprunt. Chaque chapitre compte 2 ou 3 leçons courtes, et un examen clôture le cours.',
}

const chapters: Chapter[] = [
  {
    title: 'DeFi et finance traditionnelle',
    lessons: [
      {
        title: 'La technologie blockchain',
        banner: banner1,
        blocks: [
          { type: 'heading', text: 'L’essor de la DeFi' },
          { type: 'paragraph', text: 'La DeFi s’inspire de la blockchain, la technologie derrière la monnaie numérique bitcoin. Elle permet à plusieurs entités de détenir une copie d’un historique de transactions : il n’est donc pas contrôlé par une source unique et centrale. C’est important, car les systèmes centralisés et les intermédiaires humains peuvent limiter la rapidité et la sophistication des transactions, tout en laissant aux utilisateurs moins de contrôle direct sur leur argent. La DeFi se distingue parce qu’elle étend l’usage de la blockchain du simple transfert de valeur à des usages financiers plus complexes.' },
          { type: 'image', src: lessonLaptop, alt: 'Un ordinateur portable posé sur une table de salon' },
          { type: 'heading', text: 'L’objectif de la DeFi' },
          { type: 'paragraph', text: 'Le bitcoin et beaucoup d’autres actifs nés du numérique se distinguent des moyens de paiement numériques classiques, comme ceux gérés par Visa et PayPal, parce qu’ils retirent tous les intermédiaires des transactions. Quand vous payez un café par carte bancaire, un établissement financier se place entre vous et le commerce : il contrôle la transaction, garde le pouvoir de l’arrêter ou de la suspendre, et l’inscrit dans son registre privé. Avec le bitcoin, ces établissements disparaissent du circuit.' },
          { type: 'paragraph', text: 'Les achats directs ne sont pas les seules transactions ou contrats supervisés par de grandes entreprises : prêts, assurances, financement participatif, produits dérivés, paris et bien d’autres applications financières sont aussi sous leur contrôle. Supprimer les intermédiaires de toutes sortes de transactions est l’un des principaux avantages de la DeFi.' },
          { type: 'heading', text: 'Accessibilité et transparence' },
          { type: 'paragraph', text: 'Avant d’être connue sous le nom de finance décentralisée, l’idée de la DeFi était souvent appelée « finance ouverte ». La DeFi améliore les systèmes financiers historiques et crée une infrastructure financière accessible à toute personne disposant d’une connexion internet, partout dans le monde. Aujourd’hui, beaucoup de ces nouvelles expériences financières sont construites sur la blockchain Ethereum.' },
          { type: 'image', src: lessonWatch, alt: 'Une personne qui regarde sa montre connectée' },
          { type: 'paragraph', text: 'La plupart des applications qui se disent « DeFi » sont construites sur Ethereum, la deuxième plus grande plateforme de cryptomonnaie au monde. Elle se distingue de la plateforme Bitcoin parce qu’il est plus facile de s’en servir pour créer d’autres types d’applications décentralisées, au-delà des simples transactions. Ces usages financiers plus complexes étaient déjà mis en avant par le créateur d’Ethereum, Vitalik Buterin, dès 2013 dans le livre blanc original d’Ethereum.' },
        ],
      },
      {
        title: 'Les failles de la finance traditionnelle',
        banner: banner2,
        blocks: [
          { type: 'heading', text: 'Pourquoi regarder la finance traditionnelle ?' },
          { type: 'paragraph', text: 'Avant de voir ce que la DeFi change, il est utile de voir où le système financier actuel montre ses limites. Il fonctionne bien pour beaucoup de gens, mais il est souvent lent, cher et fermé à une grande partie du monde. Cette leçon couvre ses quatre principaux points faibles : l’accès, le coût, la rapidité et la confiance.' },
          { type: 'table', caption: 'La finance traditionnelle en chiffres', head: ['', 'Le problème', 'En pratique'], rows: [
            ['Accès', 'Ouvrir un compte demande une pièce d’identité, une adresse et parfois un solde minimum', '1,3 milliard d’adultes n’ont toujours pas de compte bancaire (Banque mondiale, 2025)'],
            ['Coût', 'Chaque intermédiaire prend des frais', 'Envoyer 200 $ à l’étranger coûte 6,5 % en moyenne'],
            ['Rapidité', 'Les virements internationaux passent par plusieurs banques', '1 à 5 jours ouvrés pour arriver'],
            ['Horaires', 'Beaucoup de paiements s’arrêtent la nuit, le week-end et les jours fériés', 'Un virement envoyé le vendredi soir arrive souvent le lundi'],
            ['Transparence', 'Les banques tiennent des registres privés', 'Vous ne voyez que votre propre relevé'],
          ] },
          { type: 'heading', text: 'Trop de personnes sont laissées de côté' },
          { type: 'paragraph', text: 'Selon le Global Findex 2025 de la Banque mondiale, 1,3 milliard d’adultes n’ont pas de compte dans une banque ou chez un fournisseur de monnaie mobile. La plupart sont des femmes, des personnes aux revenus modestes ou des personnes qui vivent loin d’une agence bancaire. Sans compte, il est difficile d’épargner en sécurité, d’emprunter ou de recevoir un salaire.' },
          { type: 'heading', text: 'Des paiements lents et chers' },
          { type: 'paragraph', text: 'Un virement international passe souvent par plusieurs banques correspondantes. Chacune vérifie le paiement, ajoute un délai et prend des frais. Envoyer 200 $ à l’étranger coûte encore environ 6,5 % en moyenne, plus de deux fois l’objectif de 3 % fixé par le G20 pour 2030. Ce sont les familles qui envoient de l’argent au pays qui paient le plus.' },
          { type: 'heading', text: 'La confiance dans quelques établissements' },
          { type: 'paragraph', text: 'En 2008, la banque américaine Lehman Brothers a fait faillite et la crise s’est propagée au monde entier. Les banques avaient pris des risques que les épargnants ne pouvaient pas voir, et les États ont utilisé de l’argent public pour les sauver. Une banque peut aussi geler un compte, bloquer un paiement ou refuser un prêt sans expliquer pourquoi.' },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['1,3 milliard d’adultes n’ont pas de compte bancaire.', 'Les paiements internationaux sont lents et coûtent environ 6,5 % en moyenne.', 'Le système repose sur quelques établissements que vous ne pouvez pas vérifier vous-même.', 'La DeFi essaie de répondre à ces problèmes. La prochaine leçon montre comment, et à quel prix.'] },
        ],
      },
      {
        title: 'Avantages et défis de la DeFi',
        banner: banner3,
        blocks: [
          { type: 'box', tone: 'blue', title: 'Petit rappel', text: 'Dans La technologie blockchain, vous avez vu la principale promesse de la DeFi : pas d’intermédiaires, et des services financiers ouverts à toute personne connectée à internet. Cette leçon regarde ce que cela change en pratique, et les risques qui vont avec.' },
          { type: 'heading', text: 'Ce que la DeFi fait mieux' },
          { type: 'list', items: ['Toujours ouverte : les applications DeFi fonctionnent 24 heures sur 24, 7 jours sur 7, sans heure de fermeture.', 'Règlement rapide : un transfert sur une blockchain arrive en quelques secondes ou minutes, partout dans le monde.', 'Transparente : chaque transaction et chaque smart contract peuvent être vérifiés sur la blockchain par n’importe qui.', 'Vous gardez le contrôle : vos actifs restent dans votre propre wallet, pas sur un compte bancaire.', 'Des briques à assembler : les applications DeFi se connectent entre elles, donc un token d’une application peut servir dans une autre.'] },
          { type: 'heading', text: 'Les défis' },
          { type: 'paragraph', text: 'La DeFi est encore jeune, et ses risques sont réels. En 2025, environ 3,4 milliards de dollars en crypto ont été volés lors de piratages, selon Chainalysis. Une seule attaque contre la plateforme Bybit a emporté 1,5 milliard de dollars. Sans banque au milieu, personne ne vous rembourse si quelque chose tourne mal.' },
          { type: 'table', caption: 'Principaux risques et comment les limiter', head: ['', 'Ce que cela veut dire', 'Comment vous protéger'], rows: [
            ['Piratages et bugs', 'Une faille dans un smart contract peut servir à vider les fonds', 'Utilisez des protocoles connus et audités'],
            ['Arnaques', 'Faux tokens, sites d’hameçonnage et projets qui disparaissent avec l’argent', 'Utilisez des liens enregistrés en favoris et vérifiez les adresses des contrats'],
            ['Pas de filet de sécurité', 'Pas de garantie des dépôts ni de service client. Une seed phrase perdue, ce sont des fonds perdus', 'Sauvegardez votre seed phrase hors ligne et ne la partagez jamais'],
            ['Volatilité', 'Le prix des cryptos peut chuter fortement en quelques heures', 'N’utilisez que de l’argent que vous pouvez vous permettre de perdre'],
            ['Réglementation', 'Les règles varient selon les pays et évoluent encore', 'Vérifiez ce qui s’applique là où vous vivez'],
            ['Facilité d’usage', 'Wallets, frais de gas et autorisations sont difficiles pour les débutants', 'Commencez avec de petits montants, comme dans les exercices pratiques'],
          ] },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['La DeFi est ouverte 24 h/24 et 7 j/7, rapide, transparente, et vous garde maître de vos actifs.', 'En échange, vous portez le risque vous-même : pas de banque et pas de remboursement.', 'Utilisez des protocoles connus, vérifiez chaque lien et commencez petit.'] },
        ],
      },
    ],
  },
  {
    title: 'Le yield farming',
    lessons: [
      {
        title: 'APR ou APY',
        banner: banner4,
        blocks: [
          { type: 'heading', text: 'Qu’est-ce que le yield farming ?' },
          { type: 'paragraph', text: 'Le yield farming est l’une des tendances les plus en vogue de la finance décentralisée. Il récompense les investisseurs qui bloquent leurs cryptos dans un marché DeFi. Au fond, le yield farming est un procédé qui permet aux détenteurs de cryptomonnaies de gagner des récompenses sur leurs avoirs. L’investisseur dépose des unités d’une cryptomonnaie dans un protocole de prêt pour toucher des intérêts issus des frais de trading. Certains utilisateurs reçoivent aussi des rendements supplémentaires en token de gouvernance du protocole.' },
          { type: 'heading', text: 'Comprendre les pools de liquidité, les fournisseurs de liquidité et le modèle de teneur de marché automatisé' },
          { type: 'paragraph', text: 'Le yield farming repose sur un fournisseur de liquidité et un pool de liquidité (un smart contract rempli de fonds) qui fait tourner un marché DeFi. Un fournisseur de liquidité est un investisseur qui dépose des fonds dans un smart contract. Le yield farming fonctionne selon le modèle du teneur de marché automatisé (AMM).' },
          { type: 'paragraph', text: 'Ce modèle est répandu sur les plateformes d’échange décentralisées. L’AMM supprime le carnet d’ordres classique, qui regroupe tous les ordres d’« achat » et de « vente » d’une plateforme d’échange de cryptomonnaies. Au lieu d’annoncer le prix auquel un actif doit s’échanger, un AMM crée des pools de liquidité à l’aide de smart contracts. Ces pools exécutent les échanges selon des algorithmes prédéfinis. Les utilisateurs de la DeFi paient des frais de trading à la plateforme, qui les partage avec les LP selon leur part de la liquidité du pool.' },
          { type: 'heading', text: 'APR ou APY : lire le rendement' },
          { type: 'paragraph', text: 'Les plateformes de yield farming affichent ce que vous pouvez gagner sous forme de pourcentage annuel. Deux chiffres sont utilisés, et ils ne sont pas identiques. L’APR (taux annuel) est le taux annuel simple, sans intérêts composés. L’APY (rendement annuel) inclut les intérêts composés : les récompenses gagnées sont réinvesties et rapportent à leur tour.' },
          { type: 'table', caption: 'Même taux, résultat différent', head: ['', 'APR', 'APY'], rows: [
            ['Ce qu’il mesure', 'Taux annuel simple', 'Taux annuel avec intérêts composés'],
            ['Récompenses réinvesties ?', 'Non', 'Oui, automatiquement ou par vous'],
            ['15 % sur 10 000 $', '1 500 $ après un an', 'Environ 1 608 $ si composé chaque mois'],
            ['Où vous le voyez', 'Prêt et emprunt', 'Yield farming et staking'],
          ] },
          { type: 'box', tone: 'yellow', title: 'Avant de faire confiance à un rendement', items: ['Comparez le même chiffre : convertissez l’APR en APY avant de comparer deux plateformes.', 'Vérifiez le token de récompense : beaucoup de rendements sont payés dans le token du protocole, et son prix peut baisser.', 'Les rendements très élevés signifient en général un risque très élevé, et ils durent rarement.'] },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['L’APR ignore les intérêts composés, l’APY les inclut.', 'Plus les récompenses sont composées souvent, plus l’APY est élevé.', 'Un rendement n’est qu’une estimation : il change avec le marché et avec le prix du token de récompense.'] },
        ],
      },
      {
        title: 'La perte impermanente',
        banner: banner1,
        blocks: [
          { type: 'heading', text: 'Qu’est-ce que la perte impermanente ?' },
          { type: 'paragraph', text: 'Quand vous déposez deux tokens dans un pool de liquidité, le pool garde leur valeur totale équilibrée. Si le prix d’un des tokens change, les traders rééquilibrent le pool : vous vous retrouvez avec plus du token qui a baissé et moins du token qui a monté. La perte impermanente est l’écart entre ce que vaut votre part du pool et ce que vaudraient vos tokens si vous les aviez simplement gardés dans votre wallet.' },
          { type: 'heading', text: 'Un exemple simple' },
          { type: 'paragraph', text: 'Alice dépose 1 ETH et 100 USDC quand 1 ETH vaut 100 USDC, soit 200 $ au total. L’ETH monte ensuite à 400 USDC. Les traders rééquilibrent le pool, et la part d’Alice est maintenant de 0,5 ETH et 200 USDC, soit 400 $. Si elle avait gardé son 1 ETH et ses 100 USDC dans son wallet, elle aurait 500 $. Les 100 $ d’écart sont sa perte impermanente, avant les frais de trading.' },
          { type: 'table', caption: 'Quelle est l’ampleur de la perte ?', head: ['Variation du prix', 'Perte par rapport à la détention', 'Ce que cela veut dire'], rows: [
            ['×1,25', 'Environ 0,6 %', 'Les petits mouvements coûtent peu'],
            ['×1,5', 'Environ 2 %', 'Les frais de trading la couvrent souvent'],
            ['×2', 'Environ 5,7 %', 'Les frais peuvent ne pas suffire'],
            ['×3', 'Environ 13,4 %', 'Une perte importante'],
            ['×5', 'Environ 25,5 %', 'Un quart de la valeur'],
          ] },
          { type: 'heading', text: 'Pourquoi « impermanente » ?' },
          { type: 'paragraph', text: 'La perte ne devient réelle qu’au moment où vous retirez vos fonds. Si les prix reviennent à leur niveau du dépôt, la perte disparaît. Elle joue dans les deux sens : une baisse de prix provoque la même perte qu’une hausse de même ampleur. Les frais de trading gagnés par le pool peuvent en compenser une partie, voire la totalité.' },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['La perte impermanente apparaît quand les prix des deux tokens d’un pool s’écartent.', 'Plus le mouvement est grand, plus la perte est grande, que les prix montent ou baissent.', 'Les pools de deux stablecoins, comme USDC et DAI, ont très peu de perte impermanente.'] },
        ],
      },
    ],
  },
  {
    title: 'Les plateformes d’échange décentralisées',
    lessons: [
      {
        title: 'Comment fonctionne un DEX',
        banner: banner3,
        blocks: [
          { type: 'heading', text: 'Qu’est-ce qu’une plateforme d’échange décentralisée ?' },
          { type: 'paragraph', text: 'Une plateforme d’échange décentralisée (DEX) vous permet d’échanger un token contre un autre directement depuis votre propre wallet. Aucune entreprise ne détient vos fonds, il n’y a pas de compte à ouvrir ni de vérification d’identité : l’échange est exécuté par des smart contracts sur la blockchain. Uniswap, Curve et PancakeSwap sont des DEX connus. Pour en utiliser un, vous connectez un wallet comme MetaMask, choisissez les tokens à échanger et confirmez la transaction.' },
          { type: 'table', caption: 'Plateforme centralisée ou décentralisée', head: ['', 'Centralisée (CEX)', 'Décentralisée (DEX)'], rows: [
            ['Qui détient vos fonds', 'La plateforme', 'Vous, dans votre wallet'],
            ['Compte', 'Inscription et vérification d’identité (KYC)', 'Un simple wallet'],
            ['Comment les prix sont fixés', 'Carnet d’ordres : les acheteurs rencontrent les vendeurs', 'Pools de liquidité et une formule (AMM)'],
            ['Frais', 'Frais de trading fixés par la plateforme', 'Frais de gas du réseau + frais du pool'],
            ['Risque principal', 'Piratage ou faillite de l’entreprise', 'Bugs des smart contracts et vos propres erreurs'],
          ] },
          { type: 'heading', text: 'Comment se déroule un échange' },
          { type: 'paragraph', text: 'La plupart des DEX ne mettent pas en relation acheteurs et vendeurs. Vous échangez contre un pool de liquidité, une réserve de deux tokens alimentée par d’autres utilisateurs. Une formule fixe le prix à partir des quantités présentes dans le pool, donc le prix bouge à mesure que vous échangez. Vous verrez en détail comment fonctionnent les pools dans le chapitre Les pools de liquidité. Chaque échange est une transaction sur la blockchain. Vous payez des frais de réseau (gas) aux validateurs, plus de petits frais d’échange qui vont aux personnes qui fournissent la liquidité.' },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['Un DEX vous permet d’échanger depuis votre propre wallet, sans compte et sans intermédiaire.', 'Les prix viennent de pools de liquidité et d’une formule, pas d’un carnet d’ordres.', 'Chaque échange coûte des frais de réseau (gas) plus de petits frais de pool.', 'La prochaine leçon montre comment échanger en sécurité.'] },
        ],
      },
      {
        title: 'Échanger en sécurité',
        banner: banner2,
        blocks: [
          { type: 'heading', text: 'Impact sur le prix et slippage' },
          { type: 'paragraph', text: 'Plus votre échange est gros par rapport à la taille du pool, plus il fait bouger le prix : c’est l’impact sur le prix. Pendant que votre transaction attend d’être confirmée, d’autres échanges peuvent aussi faire bouger le prix : c’est le slippage. Votre DEX vous laisse fixer une tolérance de slippage, par exemple 0,5 % ou 1 %. Si le prix bouge davantage, l’échange est annulé et vous ne payez que les frais de réseau.' },
          { type: 'box', tone: 'blue', title: 'Avant de confirmer un échange', items: ['Impact sur le prix : à quel point votre échange fait bouger le prix. Au-dessus de 1 %, réfléchissez à deux fois.', 'Tolérance de slippage : la plus grande variation de prix que vous acceptez pendant que la transaction est en attente. Si le prix bouge davantage, l’échange est annulé.', 'Montant minimum reçu : le moins que vous recevrez. Vérifiez-le à chaque fois.'] },
          { type: 'heading', text: 'Les risques à connaître' },
          { type: 'list', items: ['Faux tokens : n’importe qui peut créer un token avec un nom célèbre. Vérifiez toujours l’adresse du contrat sur une source fiable comme CoinGecko.', 'Bots et front-running : certains bots repèrent votre échange en attente et passent juste avant vous pour profiter du mouvement de prix. Une tolérance de slippage basse limite les dégâts.', 'Autorisations de tokens : la première fois que vous échangez un token, vous autorisez le DEX à le dépenser. Préférez des montants limités et révoquez les autorisations dont vous n’avez plus besoin.', 'Hameçonnage : utilisez les liens officiels enregistrés en favoris, jamais un lien venant d’une publicité ou d’un message privé.'] },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['Vérifiez l’impact sur le prix et le montant minimum reçu avant chaque échange.', 'Gardez une tolérance de slippage basse pour limiter les pertes face aux bots.', 'Garder ses fonds soi-même, c’est en être responsable : vérifiez les tokens, les liens et les autorisations.'] },
        ],
      },
    ],
  },
  {
    title: 'Les pools de liquidité',
    lessons: [
      {
        title: 'Comment fonctionne un pool de liquidité',
        banner: banner1,
        blocks: [
          { type: 'heading', text: 'Qu’est-ce qu’un pool de liquidité ?' },
          { type: 'paragraph', text: 'Un pool de liquidité est un smart contract qui contient deux tokens côte à côte, par exemple de l’ETH et de l’USDC. Sur une plateforme d’échange classique, un acheteur doit attendre un vendeur dans un carnet d’ordres. Dans un pool, les traders échangent directement contre les tokens déjà déposés, à toute heure du jour et de la nuit.' },
          { type: 'paragraph', text: 'Les personnes qui remplissent le pool s’appellent des fournisseurs de liquidité (LP). Elles déposent une valeur égale des deux tokens et reçoivent en échange des LP tokens : un reçu numérique qui prouve leur part du pool.' },
          { type: 'poolFlow' },
          { type: 'heading', text: 'Comment les prix sont fixés : le teneur de marché automatisé' },
          { type: 'paragraph', text: 'La plupart des pools utilisent un teneur de marché automatisé (AMM) : une formule remplace le carnet d’ordres. La formule classique, rendue populaire par Uniswap, est x × y = k. x et y sont les quantités de chaque token dans le pool, et k doit rester le même après chaque échange.' },
          { type: 'paragraph', text: 'Quand vous achetez de l’ETH dans un pool ETH/USDC, vous retirez de l’ETH et ajoutez de l’USDC. L’ETH devient plus rare dans le pool, donc son prix monte. Plus votre échange est gros par rapport à la taille du pool, plus le prix bouge. C’est ce qu’on appelle l’impact sur le prix, et c’est pourquoi les pools profonds donnent de meilleurs prix aux traders.' },
          { type: 'box', tone: 'blue', title: 'Exemple chiffré', text: 'Un pool contient 10 ETH et 20 000 USDC, donc k = 200 000 et 1 ETH vaut environ 2 000 USDC. Vous achetez 1 ETH. Le pool doit garder 9 ETH × 22 222 USDC = 200 000, donc vous payez environ 2 222 USDC avant frais : 11 % de plus que le prix affiché, parce que votre échange est gros pour ce petit pool.' },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['Un pool de liquidité est un smart contract contenant deux tokens, contre lesquels tout le monde peut échanger.', 'Vous échangez contre le pool, pas contre une autre personne.', 'La formule x × y = k fixe le prix : les gros échanges dans les petits pools le font beaucoup bouger.'] },
        ],
      },
      {
        title: 'Fournir de la liquidité',
        banner: banner4,
        blocks: [
          { type: 'heading', text: 'Comment les fournisseurs de liquidité gagnent' },
          { type: 'paragraph', text: 'Chaque échange paie de petits frais au pool, souvent 0,3 % sur les pools classiques. Certains pools prennent 0,05 % pour les paires stables ou 1 % pour les paires très volatiles. Les frais restent dans le pool, donc chaque LP token vaut un peu plus après chaque échange. Quand vous retirez vos fonds, vos LP tokens sont détruits et vous récupérez votre part des deux tokens, frais compris. Certains protocoles ajoutent des récompenses dans leur propre token : c’est le yield farming vu au chapitre 2.' },
          { type: 'heading', text: 'Les risques à connaître avant de fournir de la liquidité' },
          { type: 'list', items: ['Perte impermanente : si le prix d’un token bouge beaucoup par rapport à l’autre, le pool se rééquilibre automatiquement. Vous vous retrouvez avec plus du token qui a baissé et moins de celui qui a monté, pour une valeur inférieure à celle que vous auriez eue en les gardant simplement.', 'Risque lié aux smart contracts : un bug ou un piratage dans le code du pool peut vider les fonds. Préférez des protocoles audités et bien établis.', 'Tokens inconnus : dans un nouveau pool avec peu de liquidité, le créateur peut tout retirer (un « rug pull ») et laisser les LP avec des tokens sans valeur.'] },
          { type: 'table', caption: 'Perte impermanente par rapport à la simple détention', head: ['Le prix d’un token est multiplié par', 'Perte par rapport à la détention'], rows: [['× 1,25', '0,6 %'], ['× 1,5', '2,0 %'], ['× 2', '5,7 %'], ['× 3', '13,4 %'], ['× 5', '25,5 %']] },
          { type: 'paragraph', text: 'La perte reste « impermanente » tant que les prix peuvent revenir à leur niveau de départ. Elle devient réelle quand vous retirez vos fonds. Les frais de trading peuvent la compenser dans les pools très actifs.' },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['Les LP tokens sont votre reçu : ils prouvent votre part du pool.', 'Les frais de trading restent dans le pool et sont partagés entre les LP.', 'Les LP s’exposent à la perte impermanente et au risque lié aux smart contracts.', 'Les paires de stablecoins (USDC/DAI) ont peu de perte impermanente, mais rapportent en général moins.'] },
        ],
      },
    ],
  },
  {
    title: 'Emprunter et épargner',
    lessons: [
      {
        title: 'Épargner dans la DeFi',
        banner: banner3,
        blocks: [
          { type: 'heading', text: 'Épargner dans la DeFi : alimenter un pool de prêt' },
          { type: 'paragraph', text: 'Les protocoles de prêt comme Aave ou Compound fonctionnent comme une cagnotte commune gérée par des smart contracts. Les épargnants apportent des tokens au pool et commencent tout de suite à toucher des intérêts. En échange, ils reçoivent un token qui représente leur dépôt, par exemple de l’aUSDC sur Aave, dont le solde augmente à mesure que les intérêts sont versés. Il n’y a pas de durée de blocage : vous pouvez retirer quand vous voulez, tant qu’une part suffisante du pool n’est pas prêtée à ce moment-là.' },
          { type: 'box', tone: 'blue', title: 'Qui paie qui', text: 'Les épargnants apportent de l’USDC au pool de prêt et reçoivent de l’aUSDC. Les emprunteurs déposent de l’ETH en garantie et empruntent de l’USDC. Les emprunteurs paient des intérêts au pool, qui les reverse aux épargnants.' },
          { type: 'heading', text: 'D’où viennent les intérêts ?' },
          { type: 'paragraph', text: 'Les intérêts que touchent les épargnants sont payés par les emprunteurs. Aucune banque ne fixe le taux : un algorithme l’ajuste selon le taux d’utilisation du pool, c’est-à-dire la part des dépôts actuellement empruntée. Quand la majeure partie du pool est empruntée, les taux montent. Cela attire de nouveaux épargnants et pousse les emprunteurs à rembourser. Quand peu de fonds sont empruntés, les taux baissent. C’est pourquoi les taux d’épargne de la DeFi changent d’un jour à l’autre.' },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['Les épargnants apportent des tokens à un pool de prêt et reçoivent un token, comme l’aUSDC, qui grossit avec les intérêts.', 'Les intérêts sont payés par les emprunteurs, pas par une banque.', 'Les taux suivent le taux d’utilisation : plus d’emprunts, des taux plus élevés.', 'Vous pouvez retirer à tout moment, tant qu’une part suffisante du pool n’est pas empruntée.'] },
        ],
      },
      {
        title: 'Emprunter en sécurité',
        banner: banner2,
        blocks: [
          { type: 'heading', text: 'Emprunter : toujours plus de garantie que de dette' },
          { type: 'paragraph', text: 'La DeFi n’a pas de vérification de solvabilité ni de banque derrière vous. Pour emprunter, vous déposez d’abord une garantie qui vaut plus que votre prêt : les prêts sont surcollatéralisés. Chaque actif a un ratio prêt/valeur (LTV) maximum. Avec un LTV de 80 %, 10 000 $ d’ETH vous permettent d’emprunter jusqu’à 8 000 $ de stablecoins. Pourquoi emprunter plutôt que vendre ? Pour obtenir des liquidités sans vous séparer d’un actif que vous voulez garder.' },
          { type: 'heading', text: 'Facteur de santé et liquidation' },
          { type: 'paragraph', text: 'Le facteur de santé indique à quel point votre prêt est sûr : facteur de santé = (valeur de la garantie × seuil de liquidation) ÷ montant emprunté. Au-dessus de 1, vous êtes en sécurité. En dessous de 1, votre position peut être liquidée : n’importe qui peut rembourser une partie de votre dette et recevoir une partie de votre garantie avec une remise, appelée bonus de liquidation. Vous gardez le reste, mais la garantie perdue ne revient pas.' },
          { type: 'box', tone: 'blue', title: 'Exemple chiffré', text: 'Vous déposez 10 000 $ d’ETH (seuil de liquidation de 80 %) et empruntez 6 000 $ d’USDC. Facteur de santé = 10 000 × 0,8 ÷ 6 000 = 1,33. Si l’ETH baisse de 25 %, votre garantie vaut 7 500 $ et le facteur de santé tombe à 1,0 : la liquidation peut commencer.' },
          { type: 'heading', text: 'Les bons réflexes quand vous empruntez' },
          { type: 'list', items: ['Gardez une marge : visez un facteur de santé bien au-dessus de 1, par exemple 1,5 ou plus.', 'Surveillez le prix de votre garantie : une baisse de 20 à 30 % peut arriver en une seule journée.', 'Les taux variables peuvent monter vite. Vérifiez chaque semaine ce que coûte votre prêt.', 'Remboursez ou ajoutez de la garantie avant d’approcher de 1, pas après.', 'Utilisez des protocoles audités et connus, et commencez avec de petits montants.'] },
          { type: 'box', tone: 'green', title: 'À retenir', items: ['Chaque prêt est surcollatéralisé, dans la limite d’un LTV maximum.', 'Un facteur de santé inférieur à 1 déclenche la liquidation.', 'Gardez une marge de sécurité, comme 1,5, et surveillez le prix de votre garantie.'] },
        ],
      },
    ],
  },
]

const content: CourseContent = { course, chapters }
export default content
