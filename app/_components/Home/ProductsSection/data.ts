export const products = [
  {
    id: 1,
    title: "خاتم دهب عيار 21",
    category: "خاتم",
    type: "Rings",
    metal: "gold",
    karat: "عيار 21",
    rating: 4.5,
    price: 99.99,
    originalPrice: 129.99,
    reviewsCount: 82,
    description:
      "خاتم دهب فخم بتصميم كلاسيكي يناسب جميع الإطلالات اليومية والمناسبات.",
    images: [
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
    ],
    reviews: [
      {
        rating: 5,
        title: "منتج مذهل!",
        comment: "المنتج خامته ممتازة جدًا ولامع بشكل فاخر. أنصح به بشدة.",
        author: "عميل",
        date: "منذ أسبوع",
      },
      {
        rating: 4,
        title: "جميل لكنه ثقيل قليلاً",
        comment: "التصميم رائع لكن الوزن ثقيل بعض الشيء عند اليد.",
        author: "عميل",
        date: "منذ شهر",
      },
    ],
  },
  {
    id: 2,
    title: "سلسلة ذهب عيار 21",
    category: "سلسلة",
    type: "Necklaces",
    metal: "gold",
    karat: "عيار 21",
    rating: 4.8,
    price: 199.99,
    originalPrice: 250.0,
    reviewsCount: 125,
    description: "سلسلة ذهب عيار ممتاز بلمعة جذابة تناسب الاستخدام اليومي.",
    images: [
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
    ],
    reviews: [
      {
        rating: 5,
        title: "أناقة ورقي",
        comment: "قطعة فاخرة بالفعل. التغليف جميل والشحنة وصلت بسرعة.",
        author: "عميل",
        date: "منذ شهر",
      },
      {
        rating: 4,
        title: "جيد جدًا",
        comment: "المنتج مطابق للوصف لكن كنت أتمنى أن يكون الوزن أخف.",
        author: "عميل",
        date: "منذ أسبوعين",
      },
    ],
  },
  {
    id: 3,
    title: "أسواره دهب عيار 21",
    category: "أسورة",
    type: "Bracelets",
    metal: "gold",
    karat: "عيار 21",
    rating: 4.2,
    price: 149.99,
    originalPrice: 179.99,
    reviewsCount: 63,
    description: "أسواره ذهب أنيقة بتصميم عصري تضيف لمسة فاخرة ليديك.",
    images: [
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
    ],
    reviews: [
      {
        rating: 4,
        title: "تصميم جميل",
        comment: "الأسورة أنيقة لكن الحجم كبير قليلاً على معصمي.",
        author: "عميل",
        date: "منذ أسبوع",
      },
      {
        rating: 5,
        title: "جودة ممتازة",
        comment: "خامة ذهب عالية الجودة، أحببت المنتج جدًا.",
        author: "عميل",
        date: "منذ أسبوعين",
      },
    ],
  },
  {
    id: 4,
    title: "حلق دهب عيار 21",
    category: "حلق",
    type: "Earrings",
    metal: "gold",
    karat: "عيار 21",
    rating: 4.7,
    price: 89.99,
    originalPrice: 110.0,
    reviewsCount: 98,
    description: "حلق ذهب مميز بخامة عالية ووزن خفيف للاستخدام اليومي.",
    images: [
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
      "/gold-jewelry-circle.png",
    ],
    reviews: [
      {
        rating: 5,
        title: "خفة وأناقة",
        comment: "الحلق خفيف جدًا ومريح للارتداء اليومي.",
        author: "عميل",
        date: "منذ 3 أيام",
      },
      {
        rating: 4,
        title: "رائع",
        comment: "التصميم ممتاز لكن اللون أغمق من المتوقع.",
        author: "عميل",
        date: "منذ أسبوع",
      },
    ],
  },
  ...Array.from({ length: 20 }, (_, i) => {
    const baseId = 5 + i;
    const titles = ["خاتم دهب", "سلسلة ذهب", "أسوره دهب", "حلق دهب"];
    const categories = ["خاتم", "سلسلة", "أسورة", "حلق"];
    const types = ["Rings", "Necklaces", "Bracelets", "Earrings"];

    const index = i % 4;
    const title = `${titles[index]} عيار 21`;
    const category = categories[index];
    const type = types[index];

    return {
      id: baseId,
      title,
      category,
      type,
      metal: "gold",
      karat: "عيار 21",
      rating: [4.5, 4.8, 4.2, 4.7][index],
      price: [99.99, 199.99, 149.99, 89.99][index],
      originalPrice: [129.99, 250.0, 179.99, 110.0][index],
      reviewsCount: Math.floor(Math.random() * 100) + 50,
      description:
        "قطعة ذهبية فاخرة بتصميم مميز وخامة عالية الجودة تناسب جميع الإطلالات.",
      images: [
        "/gold-jewelry-circle.png",
        "/gold-jewelry-circle.png",
        "/gold-jewelry-circle.png",
      ],
      reviews: [
        {
          rating: 5,
          title: "جمال لا يوصف",
          comment: "المنتج رائع ويعطي لمعة مميزة.",
          author: "عميل",
          date: "منذ أسبوع",
        },
        {
          rating: 4,
          title: "جيد جدًا",
          comment: "ممتاز من حيث الجودة والشكل.",
          author: "عميل",
          date: "منذ أسبوعين",
        },
      ],
    };
  }),
];
