"use strict";
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const items = [
      {
        code: "P-0001",
        name: "Filtro de Óleo",
        price_cents: 2590,
        image_url: null,
      },
      {
        code: "P-0002",
        name: "Pastilha de Freio",
        price_cents: 8990,
        image_url: null,
      },
      {
        code: "P-0003",
        name: "Bateria 60Ah",
        price_cents: 45990,
        image_url: null,
      },
      {
        code: "P-0004",
        name: "Lâmpada H7",
        price_cents: 3490,
        image_url: null,
      },
      {
        code: "P-0005",
        name: "Pneu 195/55 R15",
        price_cents: 329990,
        image_url: null,
      },
    ];
    await queryInterface.bulkInsert(
      "products",
      items.map((i) => ({ ...i, created_at: now, updated_at: now }))
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
