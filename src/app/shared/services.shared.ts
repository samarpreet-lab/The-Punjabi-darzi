export interface TailoringService {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  estimatedDays: number;
  highlights: string[];
  icon?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'simple-suits' | 'patiala-suits' | 'plazo-suits' | 'frock-suits' | 'anarkali-suits' | 
    'sharara-suits' | 'umbrella-suits' | 'special-suits' | 'lehenga' | 'blouses' | 
    'school-uniforms' | 'baby-clothes' | 'finishing-work' | 'detail-work';
  thumbnailImage: string;
  images: string[];
  description: string;
  recommendedFabrics: string[];
  fit?: string;
  occasions?: string[];
  customization?: string[];
  care?: string;
  startingPrice: number;
}



export const PRICING_ROWS = [
  // Simple & Straight Suits
  { service: 'Classic Straight Suit', price: '₹250', notes: 'Customer provides fabric' },
  { service: 'Straight Suit with Simple Piping', price: '₹300', notes: 'Basic piping work' },
  { service: 'Straight Suit with Designer Piping', price: '₹350', notes: 'Designer piping details' },
  
  // Patiala Suits
  { service: 'Classic Patiala Suit', price: '₹350', notes: 'Traditional style' },
  { service: 'Patiala Suit with Kameez Lining', price: '₹550', notes: 'Shirt lining included' },
  { service: 'Patiala Suit with Full Lining', price: '₹800', notes: 'Shirt & Salwar lining' },
  
  // Plazo Suits
  { service: 'Classic Plazo Suit', price: '₹350', notes: 'Modern palazzo style' },
  { service: 'Plazo Suit with Kameez Lining', price: '₹350', notes: 'Shirt lining included' },
  { service: 'Plazo Suit with Full Lining', price: '₹800', notes: 'Shirt & Plazo lining' },
  
  // Sharara & Gharara
  { service: 'Classic Sharara Suit', price: '₹450', notes: 'Traditional sharara' },
  { service: 'Sharara with Full Lining', price: '₹800', notes: 'Complete lining package' },
  
  // Flowing & Frock-Style
  { service: 'Simple Frock Style Suit', price: '₹500', notes: 'Basic frock design' },
  { service: 'Designer Frock Style Suit', price: '₹600 - ₹800', notes: 'Intricate design work' },
  { service: 'Umbrella Cut Suit', price: 'Starts at ₹500', notes: 'Flared silhouette' },
  { service: 'Anarkali Suit', price: 'Starts at ₹550', notes: 'Traditional Anarkali' },
  
  // Specialty & Designer Wear
  { service: 'Pakistani/Afghani Style Salwar', price: 'Starts at ₹500', notes: 'Specialty ethnic style' },
  { service: 'Lehenga with Kurti Set', price: 'Starts at ₹1000', notes: 'Complete bridal set' },
  
  // All-Inclusive Package
  { service: 'Full Suit with Lining (Premium)', price: '₹1200', notes: 'We provide lining fabric' },
  
  // Blouses & School Uniforms
  { service: 'Simple Saree Blouse', price: '₹300', notes: 'Basic blouse design' },
  { service: 'Lined Saree Blouse', price: '₹500', notes: 'With inner lining' },
  { service: 'School Uniform (Salwar Suit)', price: '₹350', notes: 'Girls uniform' },
  { service: 'Add Pockets to Uniform', price: '+₹50', notes: 'Functional pockets' },
  
  // Children's Wear
  { service: 'Simple Baby Frock (Ages 1-6)', price: '₹250', notes: 'Age-appropriate sizing' },
  { service: 'Designer Baby Frock', price: '₹350', notes: 'Decorative details' },
  { service: 'Baby Salwar Suit', price: '₹350', notes: 'Comfortable fit' },
  
  // Alterations & Finishing
  { service: 'General Suit Alterations', price: 'Starts at ₹100', notes: 'Hems/darts/adjustments' },
  { service: 'Pico Finishing (Dupatta)', price: '₹25', notes: 'Edge finishing' },
  { service: 'Interlock Stitching', price: '₹40', notes: 'Secure seam finish' },
  { service: 'Turban / Pagri Stitching', price: '₹50', notes: 'Traditional turban' },
  
  // Customizations & Design Add-Ons
  { service: 'Custom Neck Design', price: '₹100', notes: 'Personalized neckline' },
  { service: 'Designer Poncha (Salwar Cuffs)', price: '₹100', notes: 'Decorative cuffs' },
  { service: 'Lace Attachment (Customer provides)', price: '₹200', notes: 'You provide lace' },
    { service: 'Lace Sourcing & Attachment', price: '₹400', notes: 'We provide lace' }
];

export const SERVICE_CATEGORIES = [
  {
    group: 'Custom Punjabi Suits',
    title: 'Simple & Straight Suits',
    description: 'Classic straight suits with optional piping work',
    price: '₹250 - ₹350',
    icon: 'fas fa-tshirt'
  },
  {
    group: 'Custom Punjabi Suits',
    title: 'Patiala Suits',
    description: 'Traditional Patiala with optional lining',
    price: '₹350 - ₹800',
    icon: 'fas fa-dharmachakra'
  },
  {
    group: 'Custom Punjabi Suits',
    title: 'Plazo & Sharara Suits',
    description: 'Modern palazzo and traditional sharara styles',
    price: '₹350 - ₹800',
    icon: 'fas fa-water'
  },
  {
    group: 'Custom Punjabi Suits',
    title: 'Frock & Anarkali Styles',
    description: 'Flowing frock, umbrella cut & Anarkali designs',
    price: '₹500 - ₹800',
    icon: 'fas fa-leaf'
  },
  {
    group: 'Specialty Designer Wear',
    title: 'Pakistani & Afghani Styles',
    description: 'Ethnic specialty styles and lehenga sets',
    price: 'Starting ₹500',
    icon: 'fas fa-star'
  },
  {
    group: 'Premium Package',
    title: 'All-Inclusive Lining ( Simple Suit)',
    description: 'We provide lining fabric & complete stitching',
    price: '₹1,200',
    icon: 'fas fa-shield-alt'
  },
  {
    group: 'Blouses & Uniforms',
    title: 'Saree Blouses',
    description: 'Simple and lined blouse designs',
    price: '₹300 - ₹500',
    icon: 'fas fa-user-tie'
  },
  {
    group: 'Blouses & Uniforms',
    title: 'School Uniforms',
    description: 'Girls\' salwar suits for schools',
    price: '₹350 (+₹50 pockets)',
    icon: 'fas fa-users'
  },
  {
    group: 'Children\'s Wear',
    title: 'Baby Frocks & Suits',
    description: 'Age 1-6, simple & designer options',
    price: '₹250 - ₹350',
    icon: 'fas fa-child'
  },
  {
    group: 'Alterations & Finishing',
    title: 'Alterations & Accessories',
    description: 'Suit alterations, pico, interlock, turban',
    price: 'Starting ₹25',
    icon: 'fas fa-cut'
  },
  {
    group: 'Design Customizations',
    title: 'Custom Details',
    description: 'Neck designs, poncha, lace work',
    price: '₹100 - ₹400',
    icon: 'fas fa-feather'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Simple & Straight Suits
  {
    id: 'classic-straight-suit',
    title: 'Classic Straight Suit',
    subtitle: 'Cotton • Everyday wear',
    category: 'simple-suits',
    thumbnailImage: 'assets/portfolio/simple suit.png',
    images: ['assets/portfolio/simple suit.png'],
    description: 'Timeless straight-cut suit perfect for daily wear. Features clean lines, comfortable fit, and versatile styling. Customer provides fabric. Starting at ₹250 for basic stitching.',
    recommendedFabrics: ['Cotton', 'Cotton Blend', 'Linen'],
    fit: 'Straight kameez • Regular salwar',
    occasions: ['Daily Wear', 'Office', 'Casual Events'],
    customization: ['Neck style', 'Sleeve length', 'Kameez length'],
    care: 'Machine wash cold. Iron on medium.',
    startingPrice: 250
  },
  {
    id: 'straight-suit-with-designer-piping',
    title: 'Straight Suit with Designer Piping',
    subtitle: 'Cotton blend • Piping details',
    category: 'simple-suits',
    thumbnailImage: 'assets/portfolio/piping-suit.png',
    images: ['assets/portfolio/piping-suit.png'],
    description: 'Elegant straight suit elevated with designer piping along neckline, sleeves, and hemline. Adds a refined touch to classic silhouette. Starting at ₹350.',
    recommendedFabrics: ['Cotton', 'Cotton Silk', 'Cambric'],
    fit: 'Straight kameez • Regular salwar',
    occasions: ['Work', 'Semi-Formal', 'College'],
    customization: ['Piping color', 'Neck style', 'Sleeve design'],
    care: 'Hand wash or gentle machine wash.',
    startingPrice: 350
  },

  // Patiala Suits
  {
    id: 'classic-patiala-suit',
    title: 'Classic Patiala Suit',
    subtitle: 'Cotton blend • Traditional style',
    category: 'patiala-suits',
    thumbnailImage: 'assets/portfolio/Classic Patiala Suit.png',
    images: ['assets/portfolio/Classic Patiala Suit.png', 'assets/portfolio/classic-patiala-2.jpg'],
    description: 'Traditional Patiala-style suit with a relaxed kameez, generous Patiala salwar, and matching dupatta. Perfect for everyday wear and comfortable enough for long hours. Hand-stitched seams ensure durability and a perfect fit. Starting at ₹350.',
    recommendedFabrics: ['Cotton', 'Cotton Blend', 'Cambric'],
    fit: 'Relaxed fit kameez • Loose Patiala salwar',
    occasions: ['Daily Wear', 'College', 'Casual Gatherings'],
    customization: ['Neck style', 'Sleeve length', 'Kameez length', 'Poncha design'],
    care: 'Machine wash cold. Tumble dry low.',
    startingPrice: 350
  },
  {
    id: 'patiala-suit-with-full-lining',
    title: 'Patiala Suit with Full Lining',
    subtitle: 'Premium • Full lining',
    category: 'patiala-suits',
    thumbnailImage: 'assets/portfolio/Patiala Suit with Full Lining.png',
    images: ['assets/portfolio/Patiala Suit with Full Lining.png'],
    description: 'Premium Patiala suit with complete inner lining for both kameez and salwar. Provides structure, comfort, and enhanced drape. Perfect for special occasions. Starting at ₹800.',
    recommendedFabrics: ['Silk', 'Silk Blend', 'Georgette', 'Crepe'],
    fit: 'Relaxed kameez with lining • Lined Patiala salwar',
    occasions: ['Weddings', 'Festivals', 'Formal Events'],
    customization: ['Lining fabric', 'Neck design', 'Embroidery options'],
    care: 'Dry clean recommended.',
    startingPrice: 800
  },

  // Palazzo & Sharara Suits
  {
    id: 'classic-plazo-suit',
    title: 'Classic Palazzo Suit',
    subtitle: 'Modern • Wide leg',
    category: 'plazo-suits',
    thumbnailImage: 'assets/portfolio/Plazo suit.jpg',
    images: ['assets/portfolio/Plazo suit.jpg'],
    description: 'Contemporary palazzo set with straight-cut kameez and flowing wide-leg palazzo pants. Modern silhouette perfect for both casual and festive occasions. Starting at ₹350.',
    recommendedFabrics: ['Georgette', 'Chiffon', 'Crepe', 'Silk Blend'],
    fit: 'Straight kameez • Wide palazzo',
    occasions: ['Festive', 'Reception', 'Sangeet', 'Party'],
    customization: ['Neck design', 'Palazzo width', 'Length', 'Lining'],
    care: 'Dry clean or hand wash gently.',
    startingPrice: 350
  },
  {
    id: 'classic-sharara-suit',
    title: 'Classic Sharara Suit',
    subtitle: 'Traditional • Flared',
    category: 'sharara-suits',
    thumbnailImage: 'assets/portfolio/Classic Sharara Suit.png',
    images: ['assets/portfolio/Classic Sharara Suit.png'],
    description: 'Traditional sharara suit with flared pants and elegant kameez. Perfect for weddings and formal celebrations. Features beautiful drape and movement. Starting at ₹450.',
    recommendedFabrics: ['Silk', 'Georgette', 'Tissue', 'Brocade'],
    fit: 'Fitted kameez • Flared sharara',
    occasions: ['Weddings', 'Engagements', 'Mehndi', 'Formal'],
    customization: ['Flare width', 'Embroidery', 'Lining', 'Dupatta style'],
    care: 'Dry clean only.',
    startingPrice: 450
  },

  // Frock & Anarkali Styles
  {
    id: 'simple-frock-style-suit',
    title: 'Simple Frock Style Suit',
    subtitle: 'Flowing • Comfortable',
    category: 'frock-suits',
    thumbnailImage: 'assets/portfolio/Simple Frock Style Suit.png',
    images: ['assets/portfolio/Simple Frock Style Suit.png'],
    description: 'Flowing frock-style suit with comfortable fit and elegant drape. Flattering A-line silhouette suits all body types. Perfect for festive occasions. Starting at ₹500.',
    recommendedFabrics: ['Cotton Silk', 'Georgette', 'Crepe'],
    fit: 'Flared from waist • A-line silhouette',
    occasions: ['Festivals', 'Family Functions', 'Parties'],
    customization: ['Flare level', 'Neck design', 'Sleeve style', 'Length'],
    care: 'Hand wash or dry clean.',
    startingPrice: 500
  },
  {
    id: 'anarkali-suit',
    title: 'Anarkali Suit',
    subtitle: 'Traditional • Flared',
    category: 'anarkali-suits',
    thumbnailImage: 'assets/portfolio/Anarkali Suit.png',
    images: ['assets/portfolio/Anarkali Suit.png'],
    description: 'Classic Anarkali suit with fitted bodice and flowing flared skirt. Timeless design perfect for weddings and celebrations. Can be customized with embroidery and embellishments. Starting at ₹550.',
    recommendedFabrics: ['Georgette', 'Silk', 'Net', 'Chiffon'],
    fit: 'Fitted bodice • Floor-length flare',
    occasions: ['Weddings', 'Sangeet', 'Reception', 'Festivals'],
    customization: ['Length', 'Flare width', 'Embroidery', 'Neckline'],
    care: 'Dry clean recommended.',
    startingPrice: 550
  },
  {
    id: 'umbrella-cut-suit',
    title: 'Umbrella Cut Suit',
    subtitle: 'Dramatic flare • Elegant',
    category: 'umbrella-suits',
    thumbnailImage: 'assets/portfolio/Umbrella cut suit.jpg',
    images: ['assets/portfolio/Umbrella cut suit.jpg'],
    description: 'Stunning umbrella-cut suit with dramatic circular flare. Creates beautiful movement and graceful silhouette. Ideal for special occasions and celebrations. Starting at ₹500.',
    recommendedFabrics: ['Georgette', 'Chiffon', 'Silk', 'Crepe'],
    fit: 'Fitted bodice • Full circular flare',
    occasions: ['Weddings', 'Receptions', 'Formal Events'],
    customization: ['Panel count', 'Length', 'Neck design', 'Embroidery'],
    care: 'Dry clean only.',
    startingPrice: 500
  },

  // Specialty Designer Wear
  {
    id: 'pakistani-afghani-style-salwar',
    title: 'Pakistani/Afghani Style Salwar',
    subtitle: 'Ethnic specialty • Unique cut',
    category: 'special-suits',
    thumbnailImage: 'assets/portfolio/Pakistani suit.png',
    images: ['assets/portfolio/Pakistani suit.png'],
    description: 'Authentic Pakistani/Afghani style suit with distinctive cut and traditional styling. Features unique drape and comfortable fit. Perfect for those seeking ethnic specialty designs. Starting at ₹500.',
    recommendedFabrics: ['Cotton', 'Lawn', 'Cambric', 'Silk'],
    fit: 'Relaxed kameez • Traditional salwar cut',
    occasions: ['Cultural Events', 'Festivals', 'Casual Wear'],
    customization: ['Traditional embroidery', 'Neckline', 'Sleeve design'],
    care: 'Hand wash recommended.',
    startingPrice: 500
  },
  {
    id: 'lehenga-with-kurti-set',
    title: 'Lehenga with Kurti Set',
    subtitle: 'Bridal • Complete set',
    category: 'lehenga',
    thumbnailImage: 'assets/portfolio/Lehenga with Kurti Set.png',
    images: ['assets/portfolio/Lehenga with Kurti Set.png', 'assets/portfolio/Lehenga with Kurti Set.png'],
    description: 'Complete bridal lehenga set with matching kurti and dupatta. Fully customizable for your special day. Intricate work and premium finishing. Starting at ₹1000.',
    recommendedFabrics: ['Silk', 'Brocade', 'Tissue', 'Velvet'],
    fit: 'Custom fitted • Flared lehenga',
    occasions: ['Weddings', 'Sangeet', 'Mehndi', 'Engagement'],
    customization: ['Embroidery design', 'Border work', 'Color scheme', 'Blouse style'],
    care: 'Dry clean only. Store carefully.',
    startingPrice: 1000
  },

  // School Uniforms & Blouses
  {
    id: 'school-uniform-salwar-suit',
    title: 'School Uniform (Salwar Suit)',
    subtitle: 'Durable • Comfortable',
    category: 'school-uniforms',
    thumbnailImage: 'assets/portfolio/School Uniform.png',
    images: ['assets/portfolio/School Uniform.png'],
    description: 'Durable school uniform salwar suit designed for active girls. Features comfortable fit, reinforced stitching, and easy-care fabric. Optional pockets available. Starting at ₹350.',
    recommendedFabrics: ['Cotton', 'Polyester Cotton Blend', 'Terrycot'],
    fit: 'Comfortable regular fit • Practical design',
    occasions: ['School', 'Daily Wear'],
    customization: ['Add pockets', 'Length adjustments', 'Name tag placement'],
    care: 'Machine wash. Iron on medium.',
    startingPrice: 350
  },
  {
    id: 'simple-saree-blouse',
    title: 'Simple Saree Blouse',
    subtitle: 'Classic • Versatile',
    category: 'blouses',
    thumbnailImage: 'assets/portfolio/Simple Saree Blouse.png',
    images: ['assets/portfolio/Simple Saree Blouse.png'],
    description: 'Classic saree blouse with perfect fit and clean finishing. Basic design suitable for everyday sarees. Can be customized with different neck and sleeve styles. Starting at ₹300.',
    recommendedFabrics: ['Cotton', 'Silk', 'Blended fabrics'],
    fit: 'Custom fitted to measurements',
    occasions: ['Daily Wear', 'Office', 'Formal'],
    customization: ['Neck design', 'Sleeve length', 'Back style', 'Lining'],
    care: 'Hand wash or dry clean.',
    startingPrice: 300
  },

  // Children's Wear
  {
    id: 'simple-baby-frock-ages-1-6',
    title: 'Simple Baby Frock',
    subtitle: 'Ages 1-6 • Comfortable',
    category: 'baby-clothes',
    thumbnailImage: 'assets/portfolio/Simple Baby Frock.png',
    images: ['assets/portfolio/Simple Baby Frock.png'],
    description: 'Adorable baby frock designed for comfort and ease of movement. Age-appropriate sizing and soft fabrics. Perfect for everyday wear and special occasions. Starting at ₹250.',
    recommendedFabrics: ['Soft Cotton', 'Cotton Blend', 'Breathable fabrics'],
    fit: 'Comfortable loose fit • Easy wear',
    occasions: ['Daily Wear', 'Parties', 'Family Events'],
    customization: ['Print selection', 'Length', 'Sleeve style'],
    care: 'Machine wash gentle. Air dry.',
    startingPrice: 250
  },
  {
    id: 'baby-salwar-suit',
    title: 'Baby Salwar Suit',
    subtitle: 'Comfortable • Playful',
    category: 'baby-clothes',
    thumbnailImage: 'assets/portfolio/Baby Salwar Suit.png',
    images: ['assets/portfolio/Baby Salwar Suit.png', 'assets/portfolio/Baby Salwar Suit.png'],
    description: 'Colorful salwar kameez designed for active kids. Features vibrant prints or playful embroidery with a comfortable salwar and soft inner lining. Perfect for Holi celebrations, family events, and casual wear. Starting at ₹350.',
    recommendedFabrics: ['Cotton', 'Cotton Blend', 'Soft Silk'],
    fit: 'Relaxed kameez • Comfortable salwar',
    occasions: ['Holi', 'Family Events', 'Festivals', 'Daily Wear'],
    customization: ['Print selection', 'Lining color', 'Salwar style'],
    care: 'Machine wash gentle. Air dry.',
    startingPrice: 350
  },
  {
    id: 'designer-baby-frock',
    title: 'Designer Baby Frock',
    subtitle: 'Festive • Decorative',
    category: 'baby-clothes',
    thumbnailImage: 'assets/portfolio/Designer Baby Frock.png',
    images: ['assets/portfolio/Designer Baby Frock.png'],
    description: 'Beautiful designer frock with decorative details and embellishments. Perfect for festivals and special occasions. Features quality stitching and comfortable fit. Starting at ₹350.',
    recommendedFabrics: ['Cotton Silk', 'Georgette', 'Soft fabrics'],
    fit: 'Comfortable party wear fit',
    occasions: ['Festivals', 'Birthdays', 'Family Functions', 'Weddings'],
    customization: ['Embellishment type', 'Color', 'Length'],
    care: 'Hand wash recommended. Dry in shade.',
    startingPrice: 350
  },

  // Detail Work & Customizations
  {
    id: 'custom-neck-design',
    title: 'Custom Neck Design',
    subtitle: 'Detail work • Hand-finished',
    category: 'detail-work',
    thumbnailImage: 'assets/portfolio/Custom Neck Design.png',
    images: ['assets/portfolio/Custom Neck Design.png', 'assets/portfolio/Custom Neck Design.png'],
    description: 'Intricate custom neck designs featuring hand-stitched embroidery, sequin work, and traditional patterns. Each neckline is crafted to complement the suit fabric and style, adding a personalized touch to your outfit. Starting at ₹100.',
    recommendedFabrics: ['Works with all fabrics'],
    fit: 'N/A',
    occasions: ['All Occasions'],
    customization: ['Pattern type', 'Sequin density', 'Thread colors', 'Stone work'],
    care: 'Handle gently. Dry clean for embroidered sections.',
    startingPrice: 100
  },
  {
    id: 'designer-poncha-salwar-cuffs',
    title: 'Designer Poncha (Salwar Cuffs)',
    subtitle: 'Decorative cuffs • Traditional',
    category: 'detail-work',
    thumbnailImage: 'assets/portfolio/Designer Poncha.png',
    images: ['assets/portfolio/Designer Poncha.png'],
    description: 'Beautiful designer poncha work for salwar cuffs. Adds traditional elegance and decorative detail to any suit. Machine stitched with precise finishing. Starting at ₹100.',
    recommendedFabrics: ['Coordinates with suit fabric'],
    fit: 'N/A',
    occasions: ['Enhances any outfit'],
    customization: ['Design pattern', 'Width', 'Embellishment level'],
    care: 'Follow suit care instructions.',
    startingPrice: 100
  },
  {
    id: 'lace-attachment-customer-provides',
    title: 'Lace Attachment',
    subtitle: 'Border work • Elegant finish',
    category: 'detail-work',
    thumbnailImage: 'assets/portfolio/Lace Attachment.png',
    images: ['assets/portfolio/Lace Attachment.png'],
    description: 'Professional lace attachment service for suits, dupattas, and borders. We can work with your lace or source premium lace for you. Precise stitching ensures durability. Starting at ₹200 (customer provides lace).',
    recommendedFabrics: ['N/A - Lace work'],
    fit: 'N/A',
    occasions: ['Enhances formal and festive wear'],
    customization: ['Lace placement', 'Stitching method', 'Pattern'],
    care: 'Handle delicately. Dry clean recommended.',
    startingPrice: 200
  }
];


