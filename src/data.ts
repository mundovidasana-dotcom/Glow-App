/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recipe, UserProfile, SocialPost, UserSubmission } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'María Alejandra',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  subscriptionActive: true,
  renewalDate: '12 de Octubre, 2026',
  country: 'Colombia',
};


export const RECIPES_DB: Recipe[] = [
  {
    id: 'desayuno-1',
    title: 'Porridge de Avena y Frambuesas con Semillas de Chía',
    category: 'Desayunos',
    image: 'https://images.unsplash.com/photo-1517881917431-1348889736cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 145,
    time: '15 min',
    difficulty: 'Fácil',
    keyNutrient: 'Alto en Omega-3 vegetal y Betaglucanos',
    whyAntiInflammatory: 'Los betaglucanos solubles de la avena junto con los elagitaninos de las frambuesas reducen significativamente la respuesta inflamatoria en el tracto digestivo y mejoran la barrera intestinal.',
    ingredients: [
      '1 taza de copos de avena integral fina',
      '2 tazas de leche de almendras sin azúcar',
      '1 cucharada de semillas de chía o cáñamo',
      '1/2 taza de frambuesas frescas silvestres',
      '1 pizca de canela de Ceylán en polvo',
      '1 cucharadita de miel de acacia o arce cruda (opcional)'
    ],
    preparation: [
      'En una olla pequeña, coloca la avena integral junto con la leche de almendras y la canela de Ceylán.',
      'Cocina a fuego medio-bajo durante 7-10 minutos, removiendo suavemente con una cuchara de madera hasta lograr una consistencia cremosa.',
      'Sirve caliente en un bol premium de cerámica.',
      'Corona con las frambuesas frescas, espolvorea las semillas de chía y añade un hilo fino de miel si deseas un toque dulce.'
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 9,
      carbs: 45,
      healthyFats: 11
    },
    featured: true
  },
  {
    id: 'desayuno-2',
    title: 'Pudding de Chía con Mango y toque de Cúrcuma',
    category: 'Desayunos',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 98,
    time: '10 min + reposo',
    difficulty: 'Fácil',
    keyNutrient: 'Omega-3 + Cúrcuma Curcumina',
    whyAntiInflammatory: 'La chía aporta ácidos grasos que mitigan citocinas inflamatorias, mientras la cúrcuma actúa como inhibidor natural de la vía NK-kB implicada en procesos de inflamación crónica.',
    ingredients: [
      '3 cucharadas de semillas de chía orgánicas',
      '1 taza de leche de coco ligera',
      '1/2 mango maduro triturado en puré',
      '1/4 cucharadita de cúrcuma pura de alta calidad',
      '1 pizca de pimienta negra recién molida (para absorber la curcumina)',
      'Chips de coco deshidratado para decorar'
    ],
    preparation: [
      'En un tarro de cristal, mezcla bien las semillas de chía, la leche de coco, la cúrcuma y la pizca de pimienta negra.',
      'Agita con fuerza y deja reposar 15 minutos. Vuelve a agitar para evitar grumos y refrigera un mínimo de 3 horas o toda la noche.',
      'Para servir, coloca el puré de mango fresco en la base de un vaso de cristal.',
      'Vierte encima de manera delicada el pudding de chía ya gelificado.',
      'Finaliza adornando con chips de coco deshidratados y un par de hojas de menta fresca.'
    ],
    nutritionalInfo: {
      calories: 280,
      protein: 6,
      carbs: 22,
      healthyFats: 18
    },
    featured: false
  },
  {
    id: 'almuerzo-1',
    title: 'Salmón Salvaje al Horno con Costra de Hierbas y Brócoli',
    category: 'Almuerzos',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviews: 210,
    time: '25 min',
    difficulty: 'Medio',
    keyNutrient: 'Excepcional en EPA/DHA y Sulforafano',
    whyAntiInflammatory: 'El salmón es la fuente por excelencia de ácidos grasos omega-3 que combaten directamente la inflamación celular. El brócoli al vapor aporta sulforafano, un activador del factor Nrf2 que estimula las defensas antioxidantes internas.',
    ingredients: [
      '1 filete de salmón salvaje (180g) con piel',
      '1 taza de ramilletes de brócoli orgánico',
      '1 cucharada de aceite de oliva virgen extra de prensa en frío',
      'Hierbas frescas picadas (perejil, eneldo y romero)',
      '1/2 limón (jugo y ralladura)',
      'Sal marina gris y pimienta rosa al gusto'
    ],
    preparation: [
      'Precalienta el horno a 180°C (350°F). Engrasa una bandeja pequeña con unas gotas de aceite de oliva.',
      'Mezcla las hierbas frescas picadas con la ralladura de limón y presiona esta mezcla sobre el lomo de salmón para crear una costra protectora y aromática.',
      'Hornea el salmón durante 12-15 minutos cuidando que quede jugoso en su interior.',
      'Mientras se hornea, cocina el brócoli al vapor durante 4-5 minutos para conservar su sulforafano y textura crujiente.',
      'Sirve el filete de salmón decorado con rodajas de limón y acompañado del brócoli rociado con aceite de oliva virgen extra.'
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 34,
      carbs: 8,
      healthyFats: 26
    },
    featured: true
  },
  {
    id: 'almuerzo-2',
    title: 'Ensalada de Quinoa con Aguacate, Espinacas y Granada',
    category: 'Almuerzos',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 134,
    time: '20 min',
    difficulty: 'Fácil',
    keyNutrient: 'Alto en Polifenoles y Grasas Monoinsaturadas',
    whyAntiInflammatory: 'La combinación de ácido oleico del aguacate con los fitonutrientes de las hojas de espinaca y los bioflavonoides de la granada ejerce un efecto sinérgico protector sobre el sistema vascular celular.',
    ingredients: [
      '1/2 taza de quinoa real limpia',
      '1 taza de espinacas baby tiernas',
      '1/2 aguacate maduro cortado en cubos',
      '3 cucharadas de semillas de granada roja',
      '1 cucharada de pepitas de calabaza ligeramente tostadas',
      'Aderezo: Limón, aceite de oliva virgen extra y una pizca de jengibre rallado'
    ],
    preparation: [
      'Cocina la quinoa en agua hirviendo con una pizca de sal marina de 12 a 15 minutos. Cuela y deja enfriar por completo.',
      'En un bol amplio de ensalada, crea una cama con las espinacas frescas baby bien lavadas.',
      'Añade la quinoa fría sobre las espinacas, seguida por los cubos de aguacate cremoso.',
      'Espolvorea con brillo las pepitas de granada y las semillas de calabaza tostadas.',
      'Emulsiona los ingredientes del aderezo en un tarro pequeño, vierte sobre la ensalada de manera uniforme y sirve de inmediato.'
    ],
    nutritionalInfo: {
      calories: 380,
      protein: 10,
      carbs: 38,
      healthyFats: 19
    },
    featured: false
  },
  {
    id: 'cena-1',
    title: 'Crema Sutil de Calabaza y Jengibre Fresco',
    category: 'Cenas',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 182,
    time: '30 min',
    difficulty: 'Fácil',
    keyNutrient: 'Carotenos + Gingeroles calmantes',
    whyAntiInflammatory: 'El jengibre reduce los mediadores inflamatorios prostanoides mediante la inhibición de las enzimas COX y LOX, mientras la calabaza cocida es sumamente protectora y reconfortante de la mucosa estomacal.',
    ingredients: [
      '400g de calabaza cortada en dados sin piel',
      '1 puerro (solo la parte blanca)',
      '1 trozo de jengibre fresco de 2 cm rallado',
      '2 tazas de caldo de verduras casero',
      '1 cucharadita de aceite de oliva virgen extra',
      'Pizca de nuez moscada y semillas de cáñamo para decorar'
    ],
    preparation: [
      'En una olla mediana dorada ligeramente el puerro picadizo en el aceite de oliva a fuego lento durante 5 minutos.',
      'Incorpora la calabaza en cubos y el jengibre fresco rallado. Rehoga durante 3 minutos más.',
      'Añade el caldo de verduras caliente hasta cubrir las verduras de manera justa.',
      'Lleva a ebullición, baja el fuego y cocina tapado unos 20 minutos hasta que la calabaza esté muy tierna.',
      'Tritura en batidora potente hasta lograr una textura aterciopelada y sutil. Decora en el plato con semillas de cáñamo y nuez moscada.'
    ],
    nutritionalInfo: {
      calories: 160,
      protein: 4,
      carbs: 24,
      healthyFats: 5
    },
    featured: true
  },
  {
    id: 'cena-2',
    title: 'Hojas de Lechuga con Tempeh Salteado y Sésamo',
    category: 'Cenas',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 81,
    time: '20 min',
    difficulty: 'Medio',
    keyNutrient: 'Prebióticos y Probióticos digestivos',
    whyAntiInflammatory: 'El tempeh orgánico fermentado es rico en isoflavonas y apoya activamente la eubiosis de la microbiota intestinal, reduciendo la endotoxemia y la inflamación de bajo grado.',
    ingredients: [
      '150g de tempeh de soja orgánica natural',
      '4 hojas de cogollos de lechuga romana o francesa (forma de barca)',
      '1 cucharada de tamari (salsa de soja sin gluten)',
      '1 diente de ajo y jengibre fresco picado',
      'Semillas de sésamo tostadas negras',
      'Pimiento rojo en rodajas muy finas'
    ],
    preparation: [
      'Desmenuza el tempeh en pequeños trozos simulando carne picada.',
      'Saltea en sartén caliente con unas gotas de aceite de sésamo u oliva, agregando el ajo picado, el jengibre y el tamari al final.',
      'Cocina durante 8-10 minutos hasta que el tempeh esté ligeramente crujiente y dorado.',
      'Lava bien las hojas grandes y firmes de lechuga francesa y sécalas con delicadeza.',
      'Rellena cada hoja con la mezcla de tempeh aromatizado. Decora con sésamo tostado y tiras finas de pimiento rojo.'
    ],
    nutritionalInfo: {
      calories: 290,
      protein: 21,
      carbs: 12,
      healthyFats: 16
    },
    featured: false
  },
  {
    id: 'snack-1',
    title: 'Trufas Nobles de Cacao Puro, Dátiles y Nueces',
    category: 'Snacks y Postres',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 167,
    time: '15 min + frío',
    difficulty: 'Fácil',
    keyNutrient: 'Altísimo en Polifenoles y Magnesio',
    whyAntiInflammatory: 'El cacao crudo sin refinar destaca por sus compuestos fenólicos que inhiben la inflamación vascular y reducen marcadores inflamatorios sanguíneos de forma natural.',
    ingredients: [
      '10 dátiles Medjool deshuesados y jugosos',
      '1/2 taza de nueces pecanas o de nogal',
      '3 cucharadas de cacao crudo en polvo orgánico',
      '1 cucharada de aceite de coco virgen virgen extra',
      '1 pizca sutil de flor de sal marina'
    ],
    preparation: [
      'Si los dátiles no están muy blandos, hidrátalos en agua tibia durante 10 minutos antes de escurrir.',
      'En un procesador de alimentos, tritura primero las nueces hasta que queden como harina de textura gruesa.',
      'Agrega los dátiles, el cacao en polvo orgánico, el aceite de coco y la pizca de flor de sal.',
      'Procesa perfectamente hasta que se forme una masa homogénea y moldeable.',
      'Forma bolitas con las palmas de tus manos, pásalas por un poco más de polvo de cacao fino o coco rallado y enfría un par de horas en nevera para dar consistencia.'
    ],
    nutritionalInfo: {
      calories: 190,
      protein: 3,
      carbs: 22,
      healthyFats: 10
    },
    featured: false
  },
  {
    id: 'snack-2',
    title: 'Golden Milk (Leche Dorada) Ancestral',
    category: 'Snacks y Postres',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 175,
    time: '10 min',
    difficulty: 'Fácil',
    keyNutrient: 'Curcumina Activa con Piperina',
    whyAntiInflammatory: 'Es la bebida reparadora por excelencia. La cúrcuma, el jengibre y la canela trabajan de forma sinérgica reduciendo el dolor inflamatorio articular y promoviendo un mejor descanso reparador.',
    ingredients: [
      '1 taza de leche de coco o almendras sin azúcar',
      '1 cucharadita de pasta o polvo de cúrcuma orgánica',
      '1/2 cucharadita de canela de Ceylán',
      '1/4 cucharadita de jengibre molido o rallado',
      '1 pizca de pimienta negra e hilo de miel cruda'
    ],
    preparation: [
      'Coloca todos los ingredientes menos la miel en un cazo pequeño.',
      'Calienta a fuego lento sin dejar que hierva durante unos 5 minutos para que se infusionen los fitoquímicos.',
      'Vierte en tu taza favorita filtrando con un colador fino si has utilizado jengibre fresco.',
      'Agrega un hilo de miel cruda al gusto y disfruta templado antes de dormir para maximizar sus virtudes antiinflamatorias.'
    ],
    nutritionalInfo: {
      calories: 85,
      protein: 1,
      carbs: 11,
      healthyFats: 3
    },
    featured: true
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    authorName: 'Camila Ríos',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    isApprovedRecipe: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    title: 'Mi versión favorita de la Ensalada de Quinoa',
    description: '¡Hoy cambié las pepitas de calabaza por nueces pecán y quedó espectacular! El efecto crujiente con la granada es de otro nivel. Siento mi digestión super ligera.',
    likesCount: 38,
    likedByCurrentUser: true,
    savedByCurrentUser: false,
    createdAt: 'Hace 2 horas',
    comments: [
      {
        id: 'c-1',
        authorName: 'Sofía Valenzuela',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
        text: '¡Wow! Qué gran idea Camila. Probaré ese cambio mañana mismo.',
        timeAgo: 'Hace 1 hora'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Lucía Méndez',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    isApprovedRecipe: true,
    image: 'https://images.unsplash.com/photo-1517881917431-1348889736cd?auto=format&fit=crop&w=800&q=80',
    title: 'Porridge reconfortante de avena y canela',
    description: 'Mi desayuno por excelencia para los días fríos o cuando siento inflamación estomacal. La canela de canela de Ceylán marca la diferencia absoluta para nivelar mi glucosa.',
    likesCount: 52,
    likedByCurrentUser: false,
    savedByCurrentUser: true,
    createdAt: 'Hace 5 horas',
    comments: []
  }
];

export const INITIAL_SUBMISSIONS: UserSubmission[] = [
  {
    id: 'sub-1',
    title: 'Zumo Verde de Apio, Jengibre y Espinacas',
    category: 'Desayunos',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587caa90?auto=format&fit=crop&w=800&q=80',
    time: '5 min',
    difficulty: 'Fácil',
    keyNutrient: 'Apigenina y Vitaminas A, C, K',
    whyAntiInflammatory: 'El apio aporta apigenina que ayuda a inhibir enzimas inflamatorias. El jengibre asiste calmando el tracto digestivo y mejorando notablemente la absorción intestinal de nutrientes.',
    ingredients: [
      '3 ramas de apio crujiente lavado',
      '1 puñado de espinacas baby tiernas',
      '1 manzana verde para dar sutil dulzura',
      '1 rodaja de jengibre de 2 cm',
      'Media taza de agua mineral pura',
      'Jugo de medio limón verde celestial'
    ],
    preparation: [
      'Pasa el apio, espinacas y la manzana limpia por el extractor de zumos.',
      'Si usas una licuadora normal, añade la media taza de agua y luego cuela mediante una gasa de tela fina para obtener el néctar.',
      'Añade el zumo de limón, remueve suavemente con cuchara de bambú y bébetelo en ayunas.'
    ],
    nutritionalInfo: {
      calories: 95,
      protein: 2,
      carbs: 18,
      healthyFats: 1
    },
    authorName: 'Regina Castro',
    authorAvatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&h=150&q=80',
    status: 'pending',
    createdAt: 'Ayer, 18:40'
  },
  {
    id: 'sub-2',
    title: 'Brochetas de Tofu con Toque Marinado de Cúrcuma',
    category: 'Almuerzos',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    time: '20 min',
    difficulty: 'Fácil',
    keyNutrient: 'Isoflavonas de soja + Curcumina',
    whyAntiInflammatory: 'El tofu aporta proteínas vegetales limpias y digestibles, mientras el aderezo con cúrcuma y pimienta negra reduce el estrés oxidativo celular y estimula enzimas hepáticas desintoxicantes.',
    ingredients: [
      '200g de tofu extra firme prensado',
      '1 cucharadita de cúrcuma pura en polvo',
      '1/4 cucharadita de pimienta de Jamaica molida',
      '1 cucharada de aceite de sésamo prensado en frío',
      '1/2 pimiento rojo cortado en dados',
      '1/2 cebolla morada crujiente en tiras gruesas'
    ],
    preparation: [
      'Corta el tofu extra firme en dados de 2 cm cuidando que no se deshagan.',
      'Mezcla el aceite de sésamo, la cúrcuma y la pimienta negra en un tazón pequeño. Añade el tofu y deja marinar por 10 minutos.',
      'Ensarta los dados de tofu alternándolos con pimiento y cebolla morada en palillos de madera.',
      'Cocina a la plancha grill de 3 a 4 minutos por cada uno de sus lados hasta que doren de manera uniforme. ¡Sirve caliente!'
    ],
    nutritionalInfo: {
      calories: 210,
      protein: 16,
      carbs: 8,
      healthyFats: 13
    },
    authorName: 'Valentina Montes',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    status: 'pending',
    createdAt: 'Hoy, 09:12'
  }
];

