// src/data/products.js

// This file holds all our product categories and items.
// Using a separate file keeps our component clean and makes it easy to update later.
// Each category has an ID, a title, and an array of children (items or sub-categories).

export const productHierarchy = [
  {
    id: 'autoclaves',
    title: 'Autoclaves',
    children: [
      { id: 'portable-autoclave', title: 'Portable Autoclave', href: '/products/portable-autoclave' },
      { id: 'vertical-autoclave', title: 'Vertical Autoclave', href: '/products/vertical-autoclave' },
      { id: 'triple-walled-vertical-autoclave', title: 'Triple Walled Vertical Autoclave', href: '/products/triple-walled-vertical-autoclave' },
      { id: 'horizontal-cylinder-autoclave', title: 'Horizontal Cylindrical Autoclave', href: '/products/horizontal-cylinder-autoclave' },
      { id: 'horizontal-rectangular-autoclave', title: 'Horizontal Rectangular Autoclave', href: '/products/horizontal-rectangular-autoclave' },
    ]
  },
  {
    id: 'test-chambers',
    title: 'Test Chambers',
    children: [
      { id: 'environmental-test-chamber', title: 'Environmental Test Chamber', href: '/products/environmental-test-chamber' },
      { id: 'humidity-test-chamber', title: 'Humidity Test Chamber', href: '/products/humidity-test-chamber' },
      { id: 'stability-chamber', title: 'Stability Chamber', href: '/products/stability-chamber' },
      { id: 'battery-test-chamber', title: 'Battery Test Chamber', href: '/products/battery-test-chamber' },
      { id: 'seed-germinator-chamber', title: 'Seed Germinator Chamber', href: '/products/seed-germinator-chamber' },
      { id: 'insect-growth-chamber', title: 'Insect Growth Chamber', href: '/products/insect-growth-chamber' },
    ]
  },
  {
    id: 'incubators',
    title: 'Incubators',
    children: [
      { id: 'dry-bath-ai-106b', title: 'Dry Bath Incubator AI-106 B', href: '/products/dry-bath-incubator-ai-106-b' },
      { id: 'dry-bath-ai-106a', title: 'Dry Bath Incubator AI-106 A', href: '/products/dry-bath-incubator-ai-106-a' },
      { id: 'dry-bath-incubator', title: 'Dry Bath Incubator', href: '/products/dry-bath-incubator' },
      { id: 'cooling-incubator-shaker-ai-105', title: 'Cooling Incubator Shaker AI-105', href: '/products/cooling-incubator-shaker-ai-105' },
      { id: 'orbital-shaker-incubator', title: 'Orbital Shaker Incubator', href: '/products/orbital-shaker-incubator' },
      { id: 'cooling-incubator-ai-103', title: 'Cooling Incubator AI-103', href: '/products/cooling-incubator-ai-103' },
      { id: 'bod-incubator', title: 'BOD Incubator', href: '/products/bod-incubator' },
      { id: 'bacteriological-incubator', title: 'Bacteriological Incubator', href: '/products/bacteriological-incubator' },
    ]
  },
  {
    id: 'shakers',
    title: 'Shakers',
    children: [
      { id: 'orbital-shaker', title: 'Orbital Shaker', href: '/products/orbital-shaker' },
      { id: 'reciprocating-shaker', title: 'Reciprocating Shaker', href: '/products/reciprocating-shaker' },
      { id: 'wrist-action-shaker', title: 'Wrist Action Shaker', href: '/products/wrist-action-shaker' },
      { id: 'mechanical-sieve-shaker', title: 'Mechanical Sieve Shaker', href: '/products/mechanical-sieve-shaker' },
      { id: 'gel-rocker', title: 'Gel Rocker', href: '/products/gel-rocker' },
    ]
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous Lab Equipment',
    children: [
      { id: 'lab-desiccator', title: 'Lab Desiccator', href: '/products/lab-desiccator' },
      { id: 'mini-centrifuge', title: 'Mini Centrifuge', href: '/products/mini-centrifuge' },
      { id: 'cod-digester', title: 'C.O.D. Digester', href: '/products/cod-digester' },
    ]
  },
  {
    id: 'ovens',
    title: 'Ovens',
    children: [
      { id: 'hot-air-oven', title: 'Hot Air Oven', href: '/products/hot-air-oven' },
      { id: 'universal-hot-air-oven', title: 'Universal Hot Air Oven', href: '/products/universal-hot-air-oven' },
      { id: 'industrial-drying-oven', title: 'Industrial Drying Oven', href: '/products/industrial-drying-oven' },
      { id: 'tray-dryer', title: 'Tray Dryer', href: '/products/tray-dryer' },
      { id: 'thin-film-oven', title: 'Thin Film Oven', href: '/products/thin-film-oven' },
      { id: 'vacuum-oven-rect', title: 'Vacuum Oven (Rectangular)', href: '/products/vacuum-oven-rectangular' },
      { id: 'vacuum-oven-cyl', title: 'Vacuum Oven (Cylindrical)', href: '/products/vacuum-oven-cylindrical' },
      { id: 'ageing-oven', title: 'Ageing Oven', href: '/products/ageing-oven' },
    ]
  },
  {
    id: 'analytical',
    title: 'Analytical Instruments',
    children: [
      { id: 'digital-ph-meter', title: 'Digital pH Meter', href: '/products/digital-ph-meter' },
      { id: 'bomb-calorimeter', title: 'Bomb Calorimeter', href: '/products/bomb-calorimeter' },
      { id: 'spectrophotometer', title: 'Spectrophotometer', href: '/products/spectrophotometer' },
      { id: 'dissolution-test', title: 'Dissolution Test Apparatus', href: '/products/dissolution-test-apparatus' },
      { id: 'karl-fischer', title: 'Karl Fischer Titrator', href: '/products/karl-fischer-titrator' },
      { id: 'colony-counter', title: 'Colony Counter', href: '/products/colony-counter' },
    ]
  },
  {
    id: 'furnace',
    title: 'Furnace',
    children: [
      { id: 'muffle-furnace', title: 'Muffle Furnace', href: '/products/muffle-furnace' },
      { id: 'high-temp-furnace', title: 'High Temperature Furnace', href: '/products/high-temperature-furnace' },
    ]
  },
  {
    id: 'refrigeration',
    title: 'Refrigeration',
    children: [
      { id: 'refrigerators', title: 'Refrigerators', href: '/products/refrigerators' },
      { id: 'freezers', title: 'Freezers', href: '/products/freezers' },
    ]
  },
  {
    id: 'water-distillation',
    title: 'Water & Distillation Systems',
    children: [
      { id: 'water-distillation-unit', title: 'Water Distillation Unit', href: '/products/water-distillation-unit' },
      { id: 'double-distillation-unit', title: 'Double Distillation Unit', href: '/products/double-distillation-unit' },
      { id: 'deionizer-system', title: 'Deionizer System', href: '/products/deionizer-system' },
    ]
  },
  {
    id: 'clean-air',
    title: 'Clean Air Equipment',
    children: [
      { id: 'laminar-air-flow', title: 'Laminar Air Flow', href: '/products/laminar-air-flow' },
      { id: 'biosafety-cabinet', title: 'Biosafety Cabinet', href: '/products/biosafety-cabinet' },
      { id: 'fume-hood', title: 'Fume Hood', href: '/products/fume-hood' },
    ]
  },
  {
    id: 'lab-furniture',
    title: 'Lab Furniture',
    children: [
      { id: 'lab-tables', title: 'Laboratory Tables', href: '/products/laboratory-tables' },
      { id: 'storage-cabinets', title: 'Storage Cabinets', href: '/products/storage-cabinets' },
      { id: 'workstations', title: 'Workstations', href: '/products/workstations' },
    ]
  },
  {
    id: 'centrifuges',
    title: 'Centrifuges',
    children: [
      { id: 'high-speed-centrifuge', title: 'High Speed Centrifuge', href: '/products/high-speed-centrifuge' },
      { id: 'table-top-centrifuge', title: 'Table Top Centrifuge', href: '/products/table-top-centrifuge' },
      { id: 'refrigerated-centrifuge', title: 'Refrigerated Centrifuge', href: '/products/refrigerated-centrifuge' },
    ]
  },
  {
    id: 'water-baths',
    title: 'Water Baths',
    children: [
      { id: 'digital-water-bath', title: 'Digital Water Bath', href: '/products/digital-water-bath' },
      { id: 'serological-water-bath', title: 'Serological Water Bath', href: '/products/serological-water-bath' },
      { id: 'shaking-water-bath', title: 'Shaking Water Bath', href: '/products/shaking-water-bath' },
    ]
  },
  {
    id: 'pharmaceutical',
    title: 'Pharmaceutical Equipment',
    children: [
      { id: 'tablet-dissolution', title: 'Tablet Dissolution Test Apparatus', href: '/products/tablet-dissolution-test' },
      { id: 'disintegration-test', title: 'Disintegration Test Apparatus', href: '/products/disintegration-test' },
      { id: 'friability-test', title: 'Friability Test Apparatus', href: '/products/friability-test' },
    ]
  }
];
