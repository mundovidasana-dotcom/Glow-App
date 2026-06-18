/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Check, Flame, Trophy, Calendar, 
  MapPin, ShoppingBag, Coffee, Star, ShieldAlert,
  ArrowRight, Heart, X, CheckSquare, Square, Info
} from 'lucide-react';
import { UserProfile } from '../types';

interface ChallengeViewProps {
  userProfile?: UserProfile;
  onAddPoints?: (points: number) => void;
  onAddIngredientsToShoppingList?: (ingredients: string[], recipeTitle: string) => void;
}

interface OptionDetail {
  title: string;
  image: string;
  ingredients: string[];
  preparation: string[];
  benefit: string;
}

interface MealSlotAlternative {
  label: string;
  icon: string;
  optionA: OptionDetail;
  optionB: OptionDetail;
}

interface ChallengDay {
  dayNumber: number;
  unlocked: boolean;
  completed: boolean;
  title: string;
  meals: {
    breakfast: MealSlotAlternative;
    lunch: MealSlotAlternative;
    dinner: MealSlotAlternative;
    snack: MealSlotAlternative;
  };
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({ 
  userProfile,
  onAddPoints, 
  onAddIngredientsToShoppingList 
}) => {
  // Generate the detailed daily options with specific menus for Day 1, 2, 3 and subsequent days
  const [days, setDays] = useState<ChallengDay[]>(() => {
    return Array.from({ length: 21 }, (_, i) => {
      const dayNum = i + 1;
      let title = `Activación Metabólica - Día ${dayNum}`;

      // Day 1 Setup
      let breakfast: MealSlotAlternative = {
        label: "Desayuno",
        icon: "🍵",
        optionA: {
          title: "Batido verde Glow con Espinaca, Jengibre y Piña",
          image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&w=600&q=80",
          benefit: "La piña contiene bromelina, enzima proteolítica que reduce marcadores de inflamación intestinal crónicos tipo citoquinas.",
          ingredients: ["1 taza de Hojas de Espinaca fresca", "1 trozo de Jengibre fresco de 2cm", "1/2 taza de Piña madura picada", "1 taza de Agua purificada o Coco seco"],
          preparation: ["Lava minuciosamente las hojas de espinaca silvestre.", "Ralla el jengibre fresco retirando la corteza externa.", "Introduce todos los ingredientes en una licuadora de alta potencia.", "Licúa por 60 segundos hasta obtener una mezcla limpia y espumosa sin colar."]
        },
        optionB: {
          title: "Pudin de Chía con Berries y Almendras",
          image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=600&q=80",
          benefit: "Las semillas de chía proveen ácidos grasos omega-3 mucilaginosos con propiedades reparadoras para las uniones estrechas del colon.",
          ingredients: ["3 cucharadas de Semillas de Chía orgánica", "1 taza de Leche de Almendras sin azúcar", "1/2 taza de Berries mixtas", "1 pizca de Canela de Ceilán"],
          preparation: ["Sumerge las semillas de chía en la leche de almendras.", "Revuelve enérgicamente durante 2 minutos continuos para evitar grumos.", "Refrigera reposando un mínimo de 4 horas o idealmente toda la noche.", "Decora con las berries frescas y la pizca de canela antes de consumir."]
        }
      };

      let lunch: MealSlotAlternative = {
        label: "Almuerzo",
        icon: "🥗",
        optionA: {
          title: "Salmón Horneado con Espárragos y Papa Criolla",
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
          benefit: "El salmón silvestre es de los alimentos con mayor densidad de ácidos EPA y DHA, moduladores inmunológicos directos de vías proinflamatorias inflamatorias.",
          ingredients: ["1 filete de Salmón fresco", "6 tallos de Espárragos frescos tiernos", "4 unidades de Papa criolla cocida", "1 cucharada de Aceite de Oliva Extra Virgen"],
          preparation: ["Precalienta el horno convencional a 180°C habituales.", "Alinea los espárragos y el filete de salmón en una bandeja amplia sazonando con sal marina ligera.", "Rocía con una fina capa de aceite de oliva prensado en frío.", "Hornea durante 15 a 18 minutos hasta tiernizar, sirviendo junto al puré rústico de papa criolla."]
        },
        optionB: {
          title: "Pechuga al Limón con Arroz de Coliflor salteado",
          image: "https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80",
          benefit: "La coliflor aporta compuestos fitoquímicos azufrados como el sulforafano, cruciales para apoyar la detoxificación hepática sistémica.",
          ingredients: ["1 filete de pechuga de pollo de granja", "1/2 coliflor mediana rallada", "Zumo de 1 limón verde fresco", "1 diente de Ajo picado"],
          preparation: ["Sazona la pechuga de pollo con ajo, sal marina y zumo de limón.", "Ralla el coliflor con rallador común para simular finos granos de arroz.", "Saltea el arroz de coliflor en wok caliente con hilos de aceite de coco.", "Cocina la pechuga a la plancha y sirve sobre la base de coliflor crujiente."]
        }
      };

      let snack: MealSlotAlternative = {
        label: "Merienda Snack",
        icon: "🥑",
        optionA: {
          title: "Manzana Verde con Mantequilla de Almendras",
          image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=600&q=80",
          benefit: "La manzana verde Granny Smith aporta quercetina, potente flavonoide estabilizador de mastocitos e histamina intestinal.",
          ingredients: ["1 Manzana verde ácida", "1 cucharada de Mantequilla de almendras pura 100% natural"],
          preparation: ["Lava minuciosamente la manzana seleccionada.", "Corta gajos medianos preservando la cáscara externa rica en fibra soluble.", "Acompaña untando generosamente la crema de almendras prensadas."]
        },
        optionB: {
          title: "Hummus con Bastones de Zanahoria y Apio frescos",
          image: "https://images.unsplash.com/photo-1577906096429-f73df2c32244?auto=format&fit=crop&w=600&q=80",
          benefit: "El apio fresco contiene altos aportes de luteolina, un fitonutriente protector de la red neuronal entérica intestinal.",
          ingredients: ["2 cucharadas de Hummus de garbanzos", "1 Zanahoria mediana pelada", "2 tallos de Apio orgánico crujiente"],
          preparation: ["Corta la zanahoria firme y el apio fresco en bastones cómodos de 6cm.", "Dispón el hummus cremoso en un pequeño pocillo integrado.", "Comete el snack frotando los crujientes vegetales con la crema mediterránea."]
        }
      };

      let dinner: MealSlotAlternative = {
        label: "Cena Ligera",
        icon: "🍲",
        optionA: {
          title: "Sopa Saciante de Zapallo, Zanahoria y Semillas de Girasol",
          image: "https://images.unsplash.com/photo-1547592165-e1d17fed6006?auto=format&fit=crop&w=600&q=80",
          benefit: "El zapallo destaca por su alta cantidad de carotenos precursores de Vitamina A, indispensable para la regeneración endotelial.",
          ingredients: ["2 tazas de Zapallo/Calabaza picada", "1 Zanahoria pelada en rodajas", "1 cucharada de Semillas de Girasol peladas", "1 pizca de Cúrcuma en polvo con pimienta"],
          preparation: ["Cocina los vegetales en agua hirviendo con una cucharadita de sal marina por 15 minutos.", "Procesa con licuadora de inmersión agregando cúrcuma y un toque de pimienta negra.", "Emplata la crema caliente y corona con las semillas de girasol tostadas para una textura crujiente."]
        },
        optionB: {
          title: "Caldo de Huesos Concentrado con Cilantro silvestre",
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
          benefit: "El caldo de huesos prolongado aporta glicina pura que sella la barrera epitelial evitando la permeabilidad patogénica.",
          ingredients: ["1.5 tazas de Caldo de Huesos cocido por 24 horas", "1 puñado de Cilantro fresco recién picado", "1/2 Limón agrio exprimido"],
          preparation: ["Calienta el caldo de huesos rústico hasta romper en hervor suave.", "Agrega unas gotas de zumo de limón fresco estimulante del ácido clorhídrico.", "Sirve en tazón hondo espolvoreando abundante cilantro fresco."]
        }
      };

      // Customize menus for Day 2
      if (dayNum === 2) {
        title = "Microbiota Activa & Caldo";
        breakfast.optionA = {
          title: "Tres Huevos Pochados sobre Cama de Rúgula y Aguacate",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
          benefit: "Los huevos ecológicos aportan colina e inmunoglobulinas protectoras de la mucosa sin inducir picos insulínicos.",
          ingredients: ["3 Huevos de pastoreo orgánicos", "1 taza de Rúgula fresca silvestre", "1/2 Aguacate Hass fileteado"],
          preparation: ["Pon a hervir agua con una cucharada de vinagre de manzana.", "Vuelca los huevos individualmente creando un remolino suave por 3 minutos.", "Sirve sobre la rúgula fresca rodeado por las rebanadas del aguacate."]
        };
        breakfast.optionB = {
          title: "Tostada de Pan de Masa Madre de Garbanzo con Aguacate",
          image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80",
          benefit: "El pan artesanal de legumbres fermentado reduce el gluten pesado, facilitando la desinflamación ruminal.",
          ingredients: ["1 rebanada de Pan de garbanzos o masa madre", "1/2 Aguacate Hass pisado con tenedor", "Sedimento de semillas de sésamo tostado"],
          preparation: ["Tuesta uniformemente la rebanada de pan artesano.", "Unta el puré rústico de aguacate sazonando con una pizca de sal marina.", "Espolvorea las semillas de sésamo para agregar grasas minerales esenciales."]
        };
        lunch.optionA = {
          title: "Pechuga de Pollo al Limón con Brócoli al Vapor",
          image: "https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80",
          benefit: "El brócoli contiene diindolilmetano (DIM), un balanceador hormonal y antiinflamatorio de vías estrogénicas.",
          ingredients: ["1 filete de Pechuga de Pollo feliz", "1 taza de ramilletes de Brócoli orgánico", "1 Limón maduro exprimido"],
          preparation: ["Asa la pechuga de pollo marinada con orégano y ajo.", "Cocina el brócoli al vapor por solo 4 minutos para conservar sus enzimas termosensibles.", "Sirve exprimiendo zumo fresco sobre ambos alimentos."]
        };
        lunch.optionB = {
          title: "Lomo de Atún Sellado con Ensalada de Rúgula y Mango",
          image: "https://images.unsplash.com/photo-1501595091296-3a9f4ecf63bb?auto=format&fit=crop&w=600&q=80",
          benefit: "El atún aporta selenio biocombustible, esencial de la enzima glutatión peroxidasa desintoxicante.",
          ingredients: ["1 filete de Lomo de Atún fresco", "1.5 tazas de Rúgula picada", "1/2 Mango verde picado en cubos"],
          preparation: ["Sella el atún en sartén caliente 2 minutos por lado (debe quedar rosado al centro).", "Mezcla la rúgula con el mango sazonando con aceite de oliva.", "Corta el lomo en tiras finas y sirve coronando la ensalada balanceada."]
        };
        snack.optionA = {
          title: "Nueces Pecanas y Cacao Puro al 85%",
          image: "https://images.unsplash.com/photo-1596708053428-1ef9f123ddce?auto=format&fit=crop&w=600&q=80",
          benefit: "Los polifenoles de cacao alimentan las cepas bacterianas benéficas intestinales como Akkermansia.",
          ingredients: ["30g de Nueces Pecanas enteras nativas", "2 cuadros de Chocolate de Cacao Orgánico al 85% sin aditivos"],
          preparation: ["Dispón las nueces y los trozos de chocolate oscuro en un pocillo de gres.", "Consume despacio, saboreando el cacao para amortiguar el sistema dopaminérgico apical."]
        };
        snack.optionB = {
          title: "Kéfir de Agua de Coco Natural con Canela",
          image: "https://images.unsplash.com/photo-1571153635327-ebd3727fb3fb?auto=format&fit=crop&w=600&q=80",
          benefit: "El kéfir inocula miles de colonias lácticas probióticas vivas regeneradoras del epitelio digestivo.",
          ingredients: ["1 vaso de Kéfir de agua de coco casero", "1/2 cucharadita de Canela de Ceilán en polvo"],
          preparation: ["Vierte el kéfir adecuadamente fermentado y frío en un vaso.", "Añade la canela revolviendo vigorosamente.", "Bebe como refresco digestivo a media tarde."]
        };
        dinner.optionA = {
          title: "Caldo de Huesos con Cilantro y Rábanos",
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
          benefit: "Los fitonutrientes del rábano activan la bilis estancada, mejorando la digestibilidad de lípidos saludables.",
          ingredients: ["1.5 tazas de Caldo de Huesos sanador", "3 rabanitos cortados en láminas extremadamente delgadas", "Cilantro silvestre picado"],
          preparation: ["Calienta vigorosamente el caldo de huesos concentrado.", "Introduce las rodajas de rábano crudo para que ablanden ligeramente.", "Decora con cilantro y tómalo caliente antes de retirarte a descansar."]
        };
        dinner.optionB = {
          title: "Sopa Cremosa de Brócoli y Coco con Semillas",
          image: "https://images.unsplash.com/photo-1618412534575-b8253a6db9e5?auto=format&fit=crop&w=600&q=80",
          benefit: "El ácido láurico del coco tiene potentes propiedades antifúngicas, atacando sobrecrecimientos de Candida.",
          ingredients: ["1.5 tazas de Brócoli hervido", "1/2 taza de Crema de Coco natural sin azúcar", "1 cucharada de Semillas de Calabaza"],
          preparation: ["Licúa el brócoli hervido con el extracto cremoso del coco templado.", "Llévalo a ebullición corta agregando sal de mar y nuez moscada.", "Sirve decorado con las semillas crujientes de calabaza."]
        };
      }

      // Customize menus for Day 3
      if (dayNum === 3) {
        title = "Reprogramación Celular";
        breakfast.optionA = {
          title: "Waffles de Harina de Coco y Huevo con Miel de Abejas",
          image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80",
          benefit: "Los triglicéridos de cadena media (MCT) del coco son fuentes de energía inmediata sin sobrecargar el páncreas.",
          ingredients: ["3 cucharadas de Harina de Coco pura", "2 Huevos completos orgánicos", "1 cucharadita de Miel cruda de abejas", "1/2 cucharadita de Extracto de Vainilla pura"],
          preparation: ["Bate minuciosamente los huevos combinándolos con la harina de coco.", "Agrega la vainilla y un chorrito de agua para aligerar la masa homogénea.", "Vierte en la waflera engrasada con aceite de coco por 4 minutos.", "Sirve coronando con el sutil hilo de miel de abejas pura."]
        };
        breakfast.optionB = {
          title: "Porridge de Avena Germinada con Arándanos y Chía",
          image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=600&q=80",
          benefit: "La avena sin gluten germinada aporta betaglucanos, optimizadores de la saciedad y el perfil lipídico inmunológico.",
          ingredients: ["1/2 taza de Hojuelas de Avena certificada sin gluten", "1 taza de Agua purificada", "1/4 de taza de Arándanos azules frescos", "1 cucharadita de Semillas de Chía"],
          preparation: ["Calienta la avena en el agua a fuego bajo durante 8 minutos hasta espesar.", "Termina retirando del fuego integrando las semillas de chía hidratantes.", "Sirve y decora con la frescura frutal de los arándanos azules antioxidantes."]
        };
        lunch.optionA = {
          title: "Tacos en Hojas de Lechuga con Carne Molida de Res",
          image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
          benefit: "La res de pastoreo contiene un ratio óptimo Omega-3/Omega-6 previniendo la cascada inflamatoria del ácido araquidónico.",
          ingredients: ["150g de Carne molida de res alimentada 100% con pasto", "3 hojas de Lechuga romana lavadas y firmes", "Pico de gallo casero con cebolla y tomate"],
          preparation: ["Saltea la carne con comino, ajo picado, pimentón dulce y sal de roca.", "Arma los tacos doblando la hoja de lechuga simulando tortillas saludables.", "Rellena con la carne jugosa y decora con abundante pico de gallo desinflamatorio."]
        };
        lunch.optionB = {
          title: "Bowl de Quinua de Colores con Aguacate y Tomates Cherry",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
          benefit: "La quinua es una pseudosemilla portadora de lisina y saponinas reguladoras de barreras celulares.",
          ingredients: ["1/2 taza de Quinua tricolor hervida", "1/2 Aguacate maduro cortado", "6 Tomates Cherry medianos partidos", "Aderezo de Limón y Perejil picado"],
          preparation: ["En un tazón, reúne la quinua sazonada ya templada.", "Rodea estéticamente colocando gajos de aguacate y mitades de tomates cherry.", "Rocía el aderezo verde de limón y perejil rico en Vitamina C reparadora."]
        };
        snack.optionA = {
          title: "Kéfir de Agua de Coco Natural",
          image: "https://images.unsplash.com/photo-1571153635327-ebd3727fb3fb?auto=format&fit=crop&w=600&q=80",
          benefit: "Promueve la secreción de inmunoglobulina A secretora en saliva y mucosas digestivas del cuerpo.",
          ingredients: ["1 vaso de Kéfir fermentado de agua de coco orgánica"],
          preparation: ["Sirve frío en tu vaso favorito de cristal.", "Tómalo idealmente a sorbos lentos para permitir que los ácidos orgánicos purifiquen tu boca."]
        };
        snack.optionB = {
          title: "Chips de Kale Horneados con Sal Marina y Levadura",
          image: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?auto=format&fit=crop&w=600&q=80",
          benefit: "El kale aporta una inmensa cantidad de clorofila quelante y magnesio relajante de espasmos entéricos.",
          ingredients: ["4 hojas grandes de Kale (col rizada)", "1 cucharada de Aceite de coco derretido", "1 cucharada de Levadura nutricional pura"],
          preparation: ["Retira las costillas de las hojas de kale rompiéndolas en porciones medianas.", "Seca de manera estricta para asegurar que queden crujientes.", "Mezcla con el aceite de coco y la levadura nutricional antes de hornear a 150°C durante 12 minutos."]
        };
        dinner.optionA = {
          title: "Crema de Espinaca al Coco con Semillas de Cáñamo",
          image: "https://images.unsplash.com/photo-1618412534575-b8253a6db9e5?auto=format&fit=crop&w=600&q=80",
          benefit: "Las semillas de cáñamo proveen una relación de proporción dorada de omega-3 y omega-6 GLA antiinflamatorios directos.",
          ingredients: ["1.5 tazas de Espinacas tiernas frescas", "1 taza de caldito vegetal de apio", "1/2 taza de Crema de coco espesa", "1 cucharada de Semillas de Cáñamo peladas"],
          preparation: ["Blanquea la espinaca en el caldo hirviendo únicamente 1 minuto para fijar la clorofila.", "Licúa agregando la crema de coco y una pizca de ajo deshidratado.", "Sirve templado y adorna con las semillas de cáñamo curativas."]
        };
        dinner.optionB = {
          title: "Tortilla Española con Claras de Huevo y Calabacín",
          image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
          benefit: "El calabacín cocido posee fibras mucilaginosas que hidratan el tracto digestivo previniendo el estreñimiento crónico.",
          ingredients: ["4 Claras de Huevo orgánico", "1/2 Calabacín verde picado muy fino", "1/2 Cebolla cabezona picada", "1 pizca de Orégano seco"],
          preparation: ["Cocina los cubitos de calabacín y cebolla con sal marina en un sartén tapado hasta que estén bien tiernos.", "Bate las claras de huevo con el orégano agregándoles los vegetales cocidos.", "Vierte de vuelta en el sartén cocinando lentamente por ambos lados hasta dorar."]
        };
      }

      return {
        dayNumber: dayNum,
        unlocked: dayNum <= 4, // Day 1-4 unlocked, rest locked by default but unlocks as you go
        completed: dayNum === 1 || dayNum === 2, // Day 1 & 2 pre-completed for demo UX
        title,
        meals: { breakfast, lunch, dinner, snack }
      };
    });
  });

  const [activeDayIdx, setActiveDayIdx] = useState<number>(2); // Default to selected Day 3 (not completed yet)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Meal selections for user tracking checklist (exactly 1 alternative per slot must be selected to mark day complete)
  // key of map: "dayNum-mealSlot" -> "A" | "B"
  const [selections, setSelections] = useState<Record<string, 'A' | 'B'>>({
    "1-breakfast": "A", "1-lunch": "A", "1-snack": "A", "1-dinner": "A",
    "2-breakfast": "A", "2-lunch": "A", "2-snack": "A", "2-dinner": "A"
  });

  // Modal display states for recipe details
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<{
    mealLabel: string;
    optionLetter: 'A' | 'B';
    detail: OptionDetail;
  } | null>(null);

  const activeDay = days[activeDayIdx];

  // Country dynamic supermarket lists
  const getGroceryStores = (country?: string) => {
    const norm = (country || 'Colombia').toLowerCase().trim();
    if (norm.includes('colombia')) {
      return 'D1, Ara, Éxito, Carulla, Olímpica 🇨🇴';
    } else if (norm.includes('méxico') || norm.includes('mexico')) {
      return 'Walmart, Bodega Aurrera, Chedraui, Soriana 🇲🇽';
    } else if (norm.includes('perú') || norm.includes('peru')) {
      return 'Plaza Vea, Metro, Tottus, Wong 🇵🇪';
    } else if (norm.includes('chile')) {
      return 'Lider, Jumbo, Santa Isabel, Unimarc 🇨🇱';
    } else {
      return 'Supermercados locales autorizados 🌎';
    }
  };

  // Check if active day has all 4 meals selected
  const activeDayMeals = ['breakfast', 'lunch', 'snack', 'dinner'];
  const isDayEligibleToComplete = activeDayMeals.every(slot => {
    return selections[`${activeDay.dayNumber}-${slot}`] !== undefined;
  });

  const handleSelectOption = (slot: string, option: 'A' | 'B') => {
    setSelections(prev => ({
      ...prev,
      [`${activeDay.dayNumber}-${slot}`]: option
    }));
  };

  const handleCompleteDay = (dayNum: number) => {
    if (!isDayEligibleToComplete) {
      setToastMessage("⚠️ Debes seleccionar un menú consumido (A o B) para todas las 4 comidas del día.");
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    setDays(prev => prev.map(d => {
      if (d.dayNumber === dayNum) {
        return { ...d, completed: true };
      }
      // Auto unlock next day
      if (d.dayNumber === dayNum + 1) {
        return { ...d, unlocked: true };
      }
      return d;
    }));

    if (onAddPoints) {
      onAddPoints(20); // Award 20 points!
    }

    setToastMessage(`🎉 ¡Día ${dayNum} completado con éxito! +20 Puntos Glow acreditados.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleIntegrateIngredients = () => {
    // Gather ingredients from consumer selected options or both alternatives to make shopping list complete
    const daySec = activeDay.dayNumber;
    const breakfastOpt = selections[`${daySec}-breakfast`] || 'A';
    const lunchOpt = selections[`${daySec}-lunch`] || 'A';
    const snackOpt = selections[`${daySec}-snack`] || 'A';
    const dinnerOpt = selections[`${daySec}-dinner`] || 'A';

    const bIngredients = breakfastOpt === 'A' ? activeDay.meals.breakfast.optionA.ingredients : activeDay.meals.breakfast.optionB.ingredients;
    const lIngredients = lunchOpt === 'A' ? activeDay.meals.lunch.optionA.ingredients : activeDay.meals.lunch.optionB.ingredients;
    const sIngredients = snackOpt === 'A' ? activeDay.meals.snack.optionA.ingredients : activeDay.meals.snack.optionB.ingredients;
    const dIngredients = dinnerOpt === 'A' ? activeDay.meals.dinner.optionA.ingredients : activeDay.meals.dinner.optionB.ingredients;

    const allJoinedIngredients = [
      ...bIngredients,
      ...lIngredients,
      ...sIngredients,
      ...dIngredients
    ];

    // Deduplicate
    const uniqIngredients = Array.from(new Set(allJoinedIngredients));

    if (onAddIngredientsToShoppingList) {
      onAddIngredientsToShoppingList(uniqIngredients, `Reto Día ${activeDay.dayNumber} - ${activeDay.title}`);
      setToastMessage(`🛒 ¡Ingredientes seleccionados del Día ${activeDay.dayNumber} agregados a tu lista inteligente!`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // Calculations
  const completedDaysCount = days.filter(d => d.completed).length;
  const challengeProgressPercent = Math.round((completedDaysCount / 21) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 w-full text-left font-sans"
    >
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373]">Nutrición Inteligente</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-dark mt-0.5 flex items-center gap-2">
            <Trophy className="w-6.5 h-6.5 text-[#D4A373] shrink-0 animate-bounce" />
            <span>Reto 21 Días: Vientre Plano y Vitalidad</span>
          </h1>
          <p className="text-brand-grey text-xs mt-1 max-w-xl leading-relaxed">
            Un mapa nutricional de precisión diseñado para desinflamar profundamente tu microbiota, equilibrar hormonas y sanar de forma integral sin pasar hambre.
          </p>
        </div>

        {/* Progress Circle stats bar */}
        <div className="p-3 bg-white border border-[#CDBCAC]/30 rounded-2xl shadow-3xs flex items-center gap-3 self-stretch sm:self-auto shrink-0">
          <div className="w-12 h-12 rounded-full bg-brand-bg relative flex items-center justify-center font-bold font-serif text-xs text-[#8F9E62]">
            <div 
              className="absolute inset-0 rounded-full border-4 border-brand-bg"
            />
            <div 
              className="absolute inset-[1px] rounded-full border-4 border-[#8F9E62]"
              style={{ clipPath: `inset(${(100 - challengeProgressPercent)}% 0px 0px 0px)` }}
            />
            <span className="relative z-10 font-bold">{completedDaysCount}/21</span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-brand-grey block">Completado</span>
            <span className="text-xs font-black text-brand-dark">{challengeProgressPercent}% del Camino</span>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-3 bg-[#CCD5AE]/20 border border-[#CCD5AE] font-bold text-xs text-[#8F9E62] rounded-2xl shadow-2xs"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ROADMAP GRID MAP - Left block taking 5 columns */}
        <div className="lg:col-span-5 bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#CDBCAC]/20 pb-3">
            <h2 className="font-serif text-base font-bold text-brand-dark flex items-center gap-1.5">
              <Calendar className="w-4.5 h-4.5 text-brand-primary" />
              <span>Mapa del Desafío</span>
            </h2>
            <span className="text-[9px] text-[#D4A373] font-black uppercase">21 Días</span>
          </div>

          <p className="text-[11px] text-brand-grey leading-relaxed">
            Selecciona el día de hoy para ingresar tus decisiones metabólicas y registrar tu cumplimiento:
          </p>

          {/* Interactive Grid of 21 Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const isSelected = activeDayIdx === idx;
              
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => {
                    if (day.unlocked) {
                      setActiveDayIdx(idx);
                    } else {
                      setToastMessage(`🔒 El Día ${day.dayNumber} está bloqueado de momento. Supera las jornadas previas primero.`);
                      setTimeout(() => setToastMessage(null), 3000);
                    }
                  }}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer relative group ${
                    isSelected 
                      ? 'border-[#D4A373] bg-[#FAEDCD]/10 text-brand-dark scale-102 ring-2 ring-[#FAEDCD]/40' 
                      : day.completed
                        ? 'border-[#8F9E62] bg-[#CCD5AE]/15 text-[#8F9E62]'
                        : day.unlocked
                          ? 'border-[#CDBCAC]/30 bg-[#FDFBF9] text-brand-dark hover:border-[#D4A373] hover:bg-white'
                          : 'border-[#CDBCAC]/15 bg-slate-50 text-brand-grey/40 cursor-not-allowed'
                  }`}
                >
                  <span className="text-[8px] font-black leading-none block">DÍA</span>
                  <span className="text-xs sm:text-sm font-serif font-black leading-none mt-0.5">{day.dayNumber}</span>
                  
                  {/* Check mark badge */}
                  {day.completed && (
                    <div className="absolute -top-1 -right-1 bg-[#8F9E62] text-white p-0.5 rounded-full ring-1 ring-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  {!day.unlocked && (
                    <span className="absolute bottom-0.5 text-[8px] opacity-60">🔒</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend and country tracking details */}
          <div className="flex gap-2.5 items-center justify-center text-[9px] text-brand-grey font-bold pt-2 border-t border-[#CDBCAC]/15 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#CCD5AE] border border-[#8F9E62]" />
              <span>Completado</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#FAEDCD] border border-[#D4A373]" />
              <span>Seleccionado</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-sm bg-slate-50 border border-[#CDBCAC]/10" />
              <span>Bloqueado</span>
            </div>
          </div>
        </div>

        {/* ACTIVE DAY DETAILS CARD - RIGHT 7 Columns */}
        <div className="lg:col-span-7 bg-white border border-[#CDBCAC]/30 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
          
          {/* Header Area with Dynamic Supermarket Localization */}
          <div className="bg-brand-bg/40 p-4 rounded-2xl border border-brand-subdued/80 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-[9px] font-black uppercase text-brand-primary tracking-widest bg-white border border-brand-subdued/50 px-2 py-0.5 rounded-sm w-fit">
                PROGRAMADO DÍA {activeDay.dayNumber}
              </span>
              
              {/* Dynamic Grocery Market Localization badge */}
              <div className="flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary rounded-full px-3 py-1 font-bold text-[9px] max-w-full truncate">
                <MapPin className="w-3 h-3 text-[#D4A373]" />
                <span className="truncate">Compra en: <strong className="font-extrabold">{getGroceryStores(userProfile?.country)}</strong></span>
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-brand-dark">
              {activeDay.title}
            </h3>
            
            <p className="text-[10px] text-brand-grey font-medium leading-relaxed">
              * El reto prioriza materia prima sin empaquetados industriales de fácil acceso local para cada país de LatAm. Sella tu compromiso marcando qué opción consumiste.
            </p>
          </div>

          {/* Meals detail list split into alternative Selector Blocks */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-wider block">MENÚ DEL DÍA (Elige lo consumido)</h4>
              <span className="text-[10px] text-brand-grey font-semibold">1 por comida</span>
            </div>
            
            <div className="space-y-3">
              {[
                { slot: 'breakfast' as const, mealObj: activeDay.meals.breakfast },
                { slot: 'lunch' as const, mealObj: activeDay.meals.lunch },
                { slot: 'snack' as const, mealObj: activeDay.meals.snack },
                { slot: 'dinner' as const, mealObj: activeDay.meals.dinner }
              ].map(({ slot, mealObj }) => {
                const currentSelection = selections[`${activeDay.dayNumber}-${slot}`];

                return (
                  <div key={slot} className="border border-[#CDBCAC]/20 rounded-xl overflow-hidden bg-[#FDFBF9]/40 shadow-3xs p-3 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-dark border-b border-brand-subdued/30 pb-1.5">
                      <span>{mealObj.icon}</span>
                      <span className="capitalize">{mealObj.label}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* OPTION A CARD */}
                      <div 
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 relative select-none ${
                          currentSelection === 'A' 
                            ? 'bg-[#CCD5AE]/10 border-[#8F9E62]/80 ring-2 ring-[#CCD5AE]/40' 
                            : 'bg-white border-[#CDBCAC]/20 hover:border-brand-primary/30'
                        }`}
                        onClick={() => handleSelectOption(slot, 'A')}
                      >
                        <div className="mt-1 shrink-0">
                          {currentSelection === 'A' ? (
                            <CheckSquare className="w-4 h-4 text-[#8F9E62]" />
                          ) : (
                            <Square className="w-4 h-4 text-brand-grey/50" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-bold text-brand-primary uppercase block tracking-wider">Opción A</span>
                          <p className="text-xs font-semibold text-brand-dark truncate leading-tight mt-0.5">
                            {mealObj.optionA.title}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRecipeDetail({
                                mealLabel: mealObj.label,
                                optionLetter: 'A',
                                detail: mealObj.optionA
                              });
                            }}
                            className="text-[9px] text-[#D4A373] hover:underline flex items-center gap-0.5 mt-1 cursor-pointer font-bold"
                          >
                            <Info className="w-3 h-3" /> Ver detalles e ingredientes
                          </button>
                        </div>
                      </div>

                      {/* OPTION B CARD */}
                      <div 
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 relative select-none ${
                          currentSelection === 'B' 
                            ? 'bg-[#CCD5AE]/10 border-[#8F9E62]/80 ring-2 ring-[#CCD5AE]/40' 
                            : 'bg-white border-[#CDBCAC]/20 hover:border-brand-primary/30'
                        }`}
                        onClick={() => handleSelectOption(slot, 'B')}
                      >
                        <div className="mt-1 shrink-0">
                          {currentSelection === 'B' ? (
                            <CheckSquare className="w-4 h-4 text-[#8F9E62]" />
                          ) : (
                            <Square className="w-4 h-4 text-brand-grey/50" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-bold text-brand-primary uppercase block tracking-wider">Opción B</span>
                          <p className="text-xs font-semibold text-brand-dark truncate leading-tight mt-0.5">
                            {mealObj.optionB.title}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRecipeDetail({
                                mealLabel: mealObj.label,
                                optionLetter: 'B',
                                detail: mealObj.optionB
                              });
                            }}
                            className="text-[9px] text-[#D4A373] hover:underline flex items-center gap-0.5 mt-1 cursor-pointer font-bold"
                          >
                            <Info className="w-3 h-3" /> Ver detalles e ingredientes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Integration checkins and shopping CTA */}
          <div className="space-y-3 pt-3 border-t border-[#CDBCAC]/20">
            {activeDay.completed ? (
              <div className="bg-[#CCD5AE]/10 border border-[#CCD5AE] p-4 rounded-2xl text-center space-y-2">
                <div className="text-white bg-[#8F9E62] rounded-full w-7 h-7 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <h4 className="font-serif text-sm font-bold text-brand-dark">¡Día Completado Exitosamente!</h4>
                <p className="text-[10px] text-brand-grey max-w-[240px] mx-auto leading-relaxed">
                  Has nutrido tu cuerpo respetando el protocolo metabólico. ¡Excelente trabajo en tus decisiones nutricionales de hoy!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {/* Visual state tracking helpers */}
                {!isDayEligibleToComplete && (
                  <div className="text-[10px] text-center text-brand-primary bg-brand-primary/5 p-2 rounded-lg border border-brand-primary/20 font-medium">
                    ⚠️ Selecciona exactamente un plato consumido (A o B) para cada una de las 4 comidas para desbloquear la finalización.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Complete Day Button */}
                  <button
                    type="button"
                    disabled={!isDayEligibleToComplete}
                    onClick={() => handleCompleteDay(activeDay.dayNumber)}
                    className={`font-bold p-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-2xs transition-all ${
                      isDayEligibleToComplete 
                        ? 'bg-[#8F9E62] hover:bg-[#7e8c53] text-white cursor-pointer active:scale-98' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Marcar Día como Completado</span>
                  </button>

                  {/* Add ingredients directly to Shopping List */}
                  <button
                    type="button"
                    onClick={handleIntegrateIngredients}
                    className="bg-white border-2 border-[#CDBCAC]/40 hover:border-[#D4A373] text-brand-dark font-bold p-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
                    <span>Llenar canasta</span>
                  </button>
                </div>
              </div>
            )}
            
            <p className="text-[9px] text-center text-brand-grey font-medium italic">
              * Recuerda complementar con hidratación constante de infusiones de jengibre y abundante agua filtrada.
            </p>
          </div>
        </div>
      </div>

      {/* RECIPE DETAIL MODAL (No illustrations, realism, clean blocks) */}
      <AnimatePresence>
        {selectedRecipeDetail && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-brand-subdued/80 flex flex-col max-h-[90vh]"
            >
              {/* Photo Area */}
              <div className="relative h-48 sm:h-56 bg-slate-100 shrink-0">
                <img 
                  src={selectedRecipeDetail.detail.image} 
                  alt={selectedRecipeDetail.detail.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedRecipeDetail(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-brand-dark p-1.5 rounded-full shadow-md cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {/* Category + Option Indicator */}
                <div className="absolute bottom-4 left-4 bg-brand-dark/80 backdrop-blur-xs px-2.5 py-1 rounded-sm text-[10px] font-black text-white uppercase tracking-widest">
                  {selectedRecipeDetail.mealLabel} • OPCIÓN {selectedRecipeDetail.optionLetter}
                </div>
              </div>

              {/* Scrollable Contents */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-left">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-dark leading-snug">
                    {selectedRecipeDetail.detail.title}
                  </h3>
                  
                  {/* Anti inflammatory Criteria reinforcement Badge */}
                  <div className="mt-2 p-3 bg-green-50 rounded-xl border border-[#CCD5AE]/40 flex items-start gap-2 text-xs">
                    <span className="text-base shrink-0">✨</span>
                    <div>
                      <strong className="block text-[#8F9E62] font-black uppercase text-[10px] tracking-wider mb-0.5">¿Por qué es antiinflamatorio?</strong>
                      <p className="text-brand-grey font-medium leading-relaxed italic text-[11px]">
                        "{selectedRecipeDetail.detail.benefit}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ingredients Listing Block */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-wider block">Ingredientes Necesarios</h4>
                  <ul className="space-y-1">
                    {selectedRecipeDetail.detail.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-brand-grey font-medium leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps of Preparation */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-wider block">Instrucciones de Preparación</h4>
                  <ol className="space-y-2">
                    {selectedRecipeDetail.detail.preparation.map((step, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-brand-grey font-medium leading-relaxed">
                        <span className="font-serif font-black text-[#D4A373] text-sm shrink-0 leading-none">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-brand-bg/50 border-t border-brand-subdued/40 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedRecipeDetail(null)}
                  className="bg-[#D4A373] hover:bg-[#c39162] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  Entendido, volver
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
