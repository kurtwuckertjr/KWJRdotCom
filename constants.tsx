
import { Category, BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  // Existing articles (keep in place)
  {
    id: 'what-is-private-key-bitcoin-guide',
    title: 'What Is a Private Key in Bitcoin? Simple Explanation for New Users',
    category: Category.BITCOIN,
    excerpt: 'The private key is the most important secret in Bitcoin. Understand how this digital master key proves ownership and why its security is the foundation of individual sovereignty.',
    date: 'January 29, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/3.%20What%20Is%20a%20Private%20Key%20in%20Bitcoin_%20Simple%20Explanation%20for%20New%20Users.webp',
    tag: 'Foundations'
  },
  {
    id: 'why-man-wear-mechanical-watch',
    title: 'Why a Man Should Wear a Mechanical Watch',
    category: Category.POLITICS,
    excerpt: 'A mechanical watch is an act of defiance against planned obsolescence. Discover why stewardship of a tiny machine is a daily vote for continuity and generational quality.',
    date: 'January 28, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/Why%20a%20Man%20Should%20Wear%20a%20Mechanical%20Watch.webp',
    tag: 'Sovereignty'
  },
  {
    id: 'adjustable-dumbbells-full-body-plan',
    title: 'Adjustable dumbbells only, the full body plan that actually scales',
    category: Category.FITNESS,
    excerpt: 'Build an athletic, strong physique with a simple full-body plan designed for busy professionals. Learn how to scale your strength with minimal equipment.',
    date: 'January 27, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/Adjustable%20dumbbells%20only%2C%20the%20full%20body%20plan%20that%20actually%20scales.webp',
    tag: 'Performance'
  },
  {
    id: 'what-is-a-bitcoin-wallet-guide',
    title: 'What Is a Bitcoin Wallet and Why Do You Need One?',
    category: Category.BITCOIN,
    excerpt: 'Your wallet is your interface to the Bitcoin network. Understand how private keys provide sovereign control of your funds without third-party permission.',
    date: 'January 26, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/2.%20What%20Is%20a%20Bitcoin%20Wallet%20and%20Why%20Do%20You%20Need%20One.webp',
    tag: 'Infrastructure'
  },
  {
    id: 'what-is-bitcoin-beginners-guide',
    title: 'What Is Bitcoin and How Does It Work? A Beginner\'s Guide',
    category: Category.BITCOIN,
    excerpt: 'Bitcoin is a digital form of money that runs on a public network instead of a bank. Discover the fundamental mechanics of the blockchain ledger and the sovereignty of private keys.',
    date: 'January 25, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/1.%20What%20Is%20Bitcoin%20and%20How%20Does%20It%20Work_%20A%20Beginner%E2%80%99s%20Guide.webp',
    tag: 'Foundations'
  },

  // Bitcoin Basics Curriculum
  {
    id: 'what-is-utxo-bitcoin',
    title: 'What Is a UTXO in Bitcoin? Unspent Transaction Outputs Explained',
    category: Category.BITCOIN,
    excerpt: 'UTXOs are the foundation of Bitcoin\'s transaction model. Learn how unspent transaction outputs work and why they matter for understanding Bitcoin\'s economy.',
    date: 'February 10, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/4.%20What%20Is%20a%20UTXO%20in%20Bitcoin_%20Unspent%20Transaction%20Outputs%20Explained.webp',
    tag: 'Infrastructure'
  },
  {
    id: 'what-is-bitcoin-address',
    title: 'What Is a Bitcoin Address and How Do You Create One?',
    category: Category.BITCOIN,
    excerpt: 'A Bitcoin address is a public label that tells people where to send your Bitcoin. Learn how addresses are created from public keys and why you should use new ones.',
    date: 'February 17, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/5.%20What%20Is%20a%20Bitcoin%20Address%20and%20How%20Do%20You%20Create%20One.webp',
    tag: 'Infrastructure'
  },
  {
    id: 'what-is-bitcoin-blockchain',
    title: 'What Is the Bitcoin Blockchain? Explained in Plain English',
    category: Category.BITCOIN,
    excerpt: 'The blockchain is a permanent, transparent ledger of all Bitcoin transactions. Understand how blocks chain together and why the blockchain is impossible to alter.',
    date: 'March 10, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/6.%20What%20Is%20the%20Bitcoin%20Blockchain_%20Explained%20in%20Plain%20English.webp',
    tag: 'Infrastructure'
  },
  {
    id: 'how-do-bitcoin-transactions-work',
    title: 'How Do Bitcoin Transactions Work? Step by Step',
    category: Category.BITCOIN,
    excerpt: 'Bitcoin transactions move money from one address to another using cryptography. Walk through the steps of how a transaction is created, broadcast, and confirmed.',
    date: 'March 17, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/7.%20How%20Do%20Bitcoin%20Transactions%20Work%20Step%20by%20Step.webp',
    tag: 'Mechanics'
  },
  {
    id: 'what-is-bitcoin-mining',
    title: 'What Is Bitcoin Mining and Why Does It Matter?',
    category: Category.BITCOIN,
    excerpt: 'Mining is the process that secures the Bitcoin network and creates new coins. Discover why miners are essential and how the mining difficulty adjusts automatically.',
    date: 'March 24, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/8.%20What%20Is%20Bitcoin%20Mining%20and%20Why%20Does%20It%20Matter.webp',
    tag: 'Mechanics'
  },
  {
    id: 'what-is-bitcoin-node',
    title: 'What Is a Bitcoin Node and What Does It Do?',
    category: Category.BITCOIN,
    excerpt: 'A Bitcoin node is a computer that validates all transactions and blocks. Learn why running a node is the most sovereign form of Bitcoin participation.',
    date: 'March 31, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/9.%20What%20Is%20a%20Bitcoin%20Node%20and%20What%20Does%20It%20Do.webp',
    tag: 'Mechanics'
  },
  {
    id: 'what-is-seed-phrase-bitcoin',
    title: 'What Is a Seed Phrase in Bitcoin and How Do You Back It Up Safely?',
    category: Category.BITCOIN,
    excerpt: 'A seed phrase is a human-readable backup of your Bitcoin private keys. Learn how to protect your seed phrase and why it\'s the master key to your digital wealth.',
    date: 'May 5, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/10.%20What%20Is%20a%20Seed%20Phrase%20in%20Bitcoin%20and%20How%20Do%20You%20Back%20It%20Up%20Safely.webp',
    tag: 'Mechanics'
  },
  {
    id: 'what-are-bitcoin-fees',
    title: 'What Are Bitcoin Fees, and Why Are They Stable on BSV but Variable on BTC?',
    category: Category.BITCOIN,
    excerpt: 'Bitcoin fees pay miners to include your transaction in a block. Understand how fee markets work and why fee economics differ across Bitcoin implementations.',
    date: 'May 12, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/11.%20What%20Are%20Bitcoin%20Fees%2C%20and%20Why%20Are%20They%20Stable%20on%20BSV%20but%20Variable%20on%20BTC.webp',
    tag: 'Advanced'
  },
  {
    id: 'on-chain-vs-off-chain-bitcoin',
    title: 'What Is On-Chain vs Off-Chain in Bitcoin? Key Differences Explained',
    category: Category.BITCOIN,
    excerpt: 'On-chain transactions settle on the blockchain; off-chain transactions happen elsewhere with the blockchain as settlement. Learn the trade-offs of both approaches.',
    date: 'May 19, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/12.%20What%20Is%20On-Chain%20vs%20Off-Chain%20in%20Bitcoin_%20Key%20Differences%20Explained.webp',
    tag: 'Advanced'
  },
  {
    id: 'what-is-bitcoin-fork',
    title: 'What Is a Bitcoin Fork? Hard Forks vs Soft Forks for Beginners',
    category: Category.BITCOIN,
    excerpt: 'A fork changes Bitcoin\'s rules. Hard forks create a new coin; soft forks are backward-compatible. Learn how forks happen and why they matter to Bitcoin\'s governance.',
    date: 'June 2, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/13.%20What%20Is%20a%20Bitcoin%20Fork_%20Hard%20Forks%20vs%20Soft%20Forks%20for%20Beginners.webp',
    tag: 'Advanced'
  },
  {
    id: 'what-is-bitcoin-halving',
    title: 'What Is the Bitcoin Halving and Why Is It Important?',
    category: Category.BITCOIN,
    excerpt: 'The halving cuts the mining reward in half every four years. Understand why halvings are built into Bitcoin\'s code and how they control inflation.',
    date: 'August 11, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/14.%20What%20Is%20the%20Bitcoin%20Halving%20and%20Why%20Is%20It%20Important.webp',
    tag: 'Advanced'
  },
  {
    id: 'how-to-get-bitcoin',
    title: 'What Are Some Ways to Get Bitcoin? Buying, Earning, and Mining Explained',
    category: Category.BITCOIN,
    excerpt: 'You can get Bitcoin by buying it, earning it, or mining it. Explore the practical methods for acquiring Bitcoin in the modern economy.',
    date: 'September 15, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/15.%20What%20Are%20Some%20Ways%20to%20Get%20Bitcoin_%20Buying%2C%20Earning%2C%20and%20Mining%20Explained.webp',
    tag: 'Practical'
  },
  {
    id: 'what-is-self-custody-bitcoin',
    title: 'What Is Self-Custody in Bitcoin and Why It Beats Leaving Coins on Exchanges',
    category: Category.BITCOIN,
    excerpt: 'Self-custody means controlling your own private keys. Learn why "not your keys, not your coins" is the foundation of Bitcoin sovereignty.',
    date: 'September 29, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/16.%20What%20Is%20Self-Custody%20in%20Bitcoin%20and%20Why%20It%20Beats%20Leaving%20Coins%20on%20Exchanges.webp',
    tag: 'Practical'
  },
  {
    id: 'bitcoin-vs-ethereum',
    title: 'What Is the Difference Between Bitcoin and Ethereum?',
    category: Category.BITCOIN,
    excerpt: 'Bitcoin is money; Ethereum is a computer. Learn the fundamental differences in design, purpose, and philosophical approach.',
    date: 'October 20, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/17.%20What%20Is%20the%20Difference%20Between%20Bitcoin%20and%20Ethereum.webp',
    tag: 'Practical'
  },
  {
    id: 'what-is-bitcoin-script',
    title: 'What Is Bitcoin Script and How Does It Enable Smart Contracts?',
    category: Category.BITCOIN,
    excerpt: 'Bitcoin Script is a simple but powerful programming language that enables everything from multi-sig wallets to complex contracts.',
    date: 'November 10, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/What%20is%20Bitcoin%20Script.webp',
    tag: 'Advanced'
  },
  {
    id: 'what-is-proof-of-work',
    title: 'What Is Proof of Work in Bitcoin and How Does It Secure the Network?',
    category: Category.BITCOIN,
    excerpt: 'Proof of Work is the consensus mechanism that secures Bitcoin. Learn how miners solve hard puzzles to create an immutable record of transactions.',
    date: 'December 1, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/19.%20What%20Is%20Proof%20of%20Work%20in%20Bitcoin%20and%20How%20Does%20It%20Secure%20the%20Network.webp',
    tag: 'Advanced'
  },
  {
    id: 'bitcoin-privacy-vs-anonymity',
    title: 'Is Bitcoin Anonymous? The Truth About Privacy vs Anonymity',
    category: Category.BITCOIN,
    excerpt: 'Bitcoin is pseudonymous, not anonymous. Learn why privacy and anonymity are different and how the blockchain creates transparency.',
    date: 'December 15, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/20.%20Is%20Bitcoin%20Anonymous_%20The%20Truth%20About%20Privacy%20vs%20Anonymity.webp',
    tag: 'Advanced'
  },
  {
    id: 'what-is-satoshi',
    title: 'What Is a Satoshi (or a "sat") in Bitcoin?',
    category: Category.BITCOIN,
    excerpt: 'A satoshi is the smallest unit of Bitcoin, worth one hundred millionth of one Bitcoin. Learn why satoshis matter as Bitcoin adoption grows.',
    date: 'December 29, 2025',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/21.%20What%20is%20a%20satoshi%20%28or%20a%20_sat__%29%20in%20Bitcoin.webp',
    tag: 'Foundations'
  },
  {
    id: 'bitcoin-glossary',
    title: 'Bitcoin Glossary: Essential Terms for Understanding Crypto',
    category: Category.BITCOIN,
    excerpt: 'A comprehensive glossary of Bitcoin and blockchain terminology. Use this reference to understand the language of Bitcoin.',
    date: 'February 2, 2026',
    image: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/1.%20Blockchain%20Terms%20Glossary.webp',
    tag: 'Foundations'
  }
];

export const CORE_IMAGES = [
  { name: 'Bitcoin Foundations', url: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/1.%20What%20Is%20Bitcoin%20and%20How%20Does%20It%20Work_%20A%20Beginner%E2%80%99s%20Guide.webp' },
  { name: 'Bitcoin Wallets', url: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/2.%20What%20Is%20a%20Bitcoin%20Wallet%20and%20Why%20Do%20You%20Need%20One.webp' },
  { name: 'Private Keys', url: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/3.%20What%20Is%20a%20Private%20Key%20in%20Bitcoin_%20Simple%20Explanation%20for%20New%20Users.webp' },
  { name: 'Dumbbell Plan', url: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/Adjustable%20dumbbells%20only%2C%20the%20full%20body%20plan%20that%20actually%20scales.webp' },
  { name: 'Mechanical Watch', url: 'https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/blog-images/Why%20a%20Man%20Should%20Wear%20a%20Mechanical%20Watch.webp' }
];

export const LOGOS = [
  { name: 'GorillaPool.com', url: 'https://gorillapool.com', color: 'text-slate-800' },
  { name: 'Open Protocol Labs', url: 'https://openprotocollabs.com', color: 'text-teal-600' },
  { name: 'bOpen.io', url: 'https://bopen.io', color: 'text-amber-500' },
];
