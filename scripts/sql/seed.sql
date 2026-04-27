-- Component types
INSERT INTO component_types (name, fields) VALUES
  ('resistor',   '{"value": "numeric", "package": "text", "tolerance": "text"}'),
  ('capacitor',  '{"value": "numeric", "package": "text", "voltage": "numeric"}'),
  ('inductor',   '{"value": "numeric", "package": "text", "current": "numeric"}'),
  ('transistor', '{"subtype": "text", "package": "text", "vce": "numeric", "ic": "numeric"}'),
  ('diode',      '{"subtype": "text", "package": "text", "vf": "numeric", "if": "numeric"}'),
  ('ic',         '{"part_number": "text", "package": "text", "function": "text"}'),
  ('crystal',    '{"frequency": "numeric", "package": "text", "load": "numeric"}'),
  ('connector',  '{"pins": "numeric", "pitch": "numeric", "type": "text"}'),
  ('led',        '{"color": "text", "package": "text", "vf": "numeric"}'),
  ('fuse',       '{"rating": "numeric", "type": "text", "package": "text"}')
ON CONFLICT (name) DO NOTHING;

-- Asset categories
INSERT INTO asset_categories (name) VALUES
  ('Instrument'),
  ('Board'),
  ('Electrical Equipment'),
  ('Adapter'),
  ('Computer'),
  ('Safety Equipment'),
  ('Mechanical Tool')
ON CONFLICT (name) DO NOTHING;

-- Owners
INSERT INTO owners (name) VALUES
  ('Lab'),
  ('Project Alpha'),
  ('Project Beta'),
  ('Project Gamma'),
  ('External Institution'),
  ('Personal - João'),
  ('Personal - Maria')
ON CONFLICT DO NOTHING;

-- Rooms
INSERT INTO rooms (name, owner_id) VALUES
  ('Main Lab',        1),
  ('Storage Room',    1),
  ('Electronics Bay', 1),
  ('Clean Room',      1),
  ('Workshop',        1)
ON CONFLICT DO NOTHING;

-- Storages
INSERT INTO storages (name, room_id) VALUES
  ('Cabinet A',       1),
  ('Cabinet B',       1),
  ('Shelf A',         1),
  ('Shelf B',         1),
  ('Drawer 1',        2),
  ('Drawer 2',        2),
  ('Box SMD',         2),
  ('Box THT',         2),
  ('Rack 1',          3),
  ('Rack 2',          3),
  ('Tool Cabinet',    5),
  ('Chemical Shelf',  2)
ON CONFLICT DO NOTHING;

-- Components: Resistors (type_id = 1)
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 100,   "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 220,   "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 330,   "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 470,   "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 1000,  "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 2200,  "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 4700,  "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 10000, "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 22000, "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 500,  1, '{"value": 47000, "package": "0402", "tolerance": "1%"}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200,  1, '{"value": 100,   "package": "0805", "tolerance": "5%"}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200,  1, '{"value": 470,   "package": "0805", "tolerance": "5%"}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200,  1, '{"value": 1000,  "package": "0805", "tolerance": "5%"}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200,  1, '{"value": 10000, "package": "0805", "tolerance": "5%"}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200,  1, '{"value": 100000,"package": "0805", "tolerance": "5%"}');

-- Components: Capacitors (type_id = 2)
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 300, 2, '{"value": 0.0000001, "package": "0402", "voltage": 10}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 300, 2, '{"value": 0.0000001, "package": "0402", "voltage": 50}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 300, 2, '{"value": 0.0000047, "package": "0402", "voltage": 10}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 300, 2, '{"value": 0.000001,  "package": "0603", "voltage": 25}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 300, 2, '{"value": 0.00001,   "package": "0603", "voltage": 16}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 2, '{"value": 0.0001,    "package": "0805", "voltage": 16}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 2, '{"value": 0.001,     "package": "1206", "voltage": 50}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50,  2, '{"value": 0.000047,  "package": "THT",  "voltage": 25}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50,  2, '{"value": 0.0001,    "package": "THT",  "voltage": 50}');

-- Components: Inductors (type_id = 3)
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 3, '{"value": 0.0000001, "package": "0402", "current": 0.3}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 3, '{"value": 0.0000022, "package": "0603", "current": 0.5}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 3, '{"value": 0.000010,  "package": "0805", "current": 1.0}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50,  3, '{"value": 0.000047,  "package": "1210", "current": 2.0}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50,  3, '{"value": 0.0001,    "package": "THT",  "current": 3.0}');

-- Components: Transistors (type_id = 4)
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 4, '{"subtype": "BJT NPN", "package": "TO-92",  "vce": 40,  "ic": 0.2}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 4, '{"subtype": "BJT PNP", "package": "TO-92",  "vce": 40,  "ic": 0.2}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50,  4, '{"subtype": "BJT NPN", "package": "TO-220", "vce": 100, "ic": 5.0}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50,  4, '{"subtype": "MOSFET N", "package": "TO-220","vce": 60,  "ic": 30}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50,  4, '{"subtype": "MOSFET P", "package": "TO-220","vce": 60,  "ic": 20}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 2); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 30,  4, '{"subtype": "MOSFET N", "package": "SOT-23","vce": 20,  "ic": 0.5}');

-- Components: Diodes (type_id = 5)
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200, 5, '{"subtype": "Rectifier", "package": "DO-41",  "vf": 0.7, "if": 1.0}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200, 5, '{"subtype": "Zener",     "package": "DO-35",  "vf": 5.1, "if": 0.5}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 5, '{"subtype": "Schottky",  "package": "SOD-123","vf": 0.3, "if": 1.0}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 5, '{"subtype": "Zener",     "package": "SOD-123","vf": 3.3, "if": 0.5}');

-- Components: ICs (type_id = 6)
INSERT INTO items (storage_id, owner_id) VALUES (1, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 20, 6, '{"part_number": "NE555",    "package": "DIP-8",  "function": "Timer"}');
INSERT INTO items (storage_id, owner_id) VALUES (1, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 20, 6, '{"part_number": "LM358",    "package": "DIP-8",  "function": "Op-Amp"}');
INSERT INTO items (storage_id, owner_id) VALUES (1, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 20, 6, '{"part_number": "ATmega328","package": "DIP-28", "function": "Microcontroller"}');
INSERT INTO items (storage_id, owner_id) VALUES (1, 2); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 10, 6, '{"part_number": "ESP32",    "package": "SMD",    "function": "WiFi MCU"}');
INSERT INTO items (storage_id, owner_id) VALUES (1, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 15, 6, '{"part_number": "STM32F103","package": "LQFP-48","function": "ARM Cortex-M3"}');
INSERT INTO items (storage_id, owner_id) VALUES (1, 3); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 10, 6, '{"part_number": "LM7805",   "package": "TO-220", "function": "Voltage Regulator"}');
INSERT INTO items (storage_id, owner_id) VALUES (1, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 10, 6, '{"part_number": "74HC595",  "package": "DIP-16", "function": "Shift Register"}');

-- Components: Crystals (type_id = 7)
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 20, 7, '{"frequency": 16000000, "package": "HC-49S", "load": 22}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 20, 7, '{"frequency": 8000000,  "package": "HC-49S", "load": 18}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 10, 7, '{"frequency": 32768,    "package": "SMD",    "load": 12}');

-- Components: Connectors (type_id = 8)
INSERT INTO items (storage_id, owner_id) VALUES (2, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50, 8, '{"pins": 2,  "pitch": 2.54, "type": "Pin Header"}');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50, 8, '{"pins": 4,  "pitch": 2.54, "type": "Pin Header"}');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 50, 8, '{"pins": 6,  "pitch": 2.54, "type": "Pin Header"}');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 30, 8, '{"pins": 40, "pitch": 2.54, "type": "Pin Header"}');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 20, 8, '{"pins": 2,  "pitch": 3.5,  "type": "Screw Terminal"}');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 20, 8, '{"pins": 4,  "pitch": 3.5,  "type": "Screw Terminal"}');

-- Components: LEDs (type_id = 9)
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200, 9, '{"color": "red",    "package": "0805", "vf": 2.0}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200, 9, '{"color": "green",  "package": "0805", "vf": 2.2}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200, 9, '{"color": "blue",   "package": "0805", "vf": 3.0}');
INSERT INTO items (storage_id, owner_id) VALUES (7, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 200, 9, '{"color": "yellow", "package": "0805", "vf": 2.1}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 9, '{"color": "red",    "package": "THT 5mm", "vf": 2.0}');
INSERT INTO items (storage_id, owner_id) VALUES (8, 1); INSERT INTO components (item_id, quantity, component_type_id, attributes) VALUES (currval('items_id_seq'), 100, 9, '{"color": "green",  "package": "THT 5mm", "vf": 2.2}');

-- Assets: Instruments (category_id = 1)
INSERT INTO items (storage_id, owner_id) VALUES (9, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Oscilloscope',        'Rigol',    'DS1054Z',    'SN-OSC-001', 'active');
INSERT INTO items (storage_id, owner_id) VALUES (9, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Multimeter',          'Fluke',    '117',        'SN-MM-001',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (9, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Multimeter',          'Fluke',    '117',        'SN-MM-002',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (9, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Power Supply',        'Korad',    'KA3005D',    'SN-PS-001',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (9, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Power Supply',        'Korad',    'KA3005D',    'SN-PS-002',  'needs_repair');
INSERT INTO items (storage_id, owner_id) VALUES (9, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Function Generator',  'Rigol',    'DG1022Z',    'SN-FG-001',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (9, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'LCR Meter',           'DE-5000',  'DE-5000',    'SN-LCR-001', 'active');
INSERT INTO items (storage_id, owner_id) VALUES (10, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Spectrum Analyzer',   'Rigol',    'DSA815',     'SN-SA-001',  'inactive');
INSERT INTO items (storage_id, owner_id) VALUES (10, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Logic Analyzer',      'Saleae',   'Logic 8',    'SN-LA-001',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (10, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Soldering Station',   'Hakko',    'FX-888D',    'SN-SS-001',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (10, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Soldering Station',   'Hakko',    'FX-888D',    'SN-SS-002',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (10, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, serial_number, status) VALUES (currval('items_id_seq'), 1, 'Hot Air Station',     'Quick',    '861DW',      'SN-HA-001',  'active');

-- Assets: Boards (category_id = 2)
INSERT INTO items (storage_id, owner_id) VALUES (1, 2);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'Arduino Uno',         'Arduino',  'Uno R3',     'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 2);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'Arduino Nano',        'Arduino',  'Nano',       'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 2);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'Arduino Mega',        'Arduino',  'Mega 2560',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 3);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'Raspberry Pi 4',      'RPi',      'Model 4B',   'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 3);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'Raspberry Pi Zero',   'RPi',      'Zero W',     'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 2);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'ESP32 DevKit',        'Espressif','DevKitC',    'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 2);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'STM32 Nucleo',        'ST',       'F401RE',     'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 4);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'FPGA Dev Board',      'Xilinx',   'Basys 3',    'active');
INSERT INTO items (storage_id, owner_id) VALUES (1, 4);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'FPGA Dev Board',      'Intel',    'DE10-Nano',  'needs_repair');
INSERT INTO items (storage_id, owner_id) VALUES (1, 2);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 2, 'BeagleBone Black',    'BeagleBoard','Rev C',   'active');

-- Assets: Electrical Equipment (category_id = 3)
INSERT INTO items (storage_id, owner_id) VALUES (11, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 3, 'Fume Extractor',      'Hakko',    'FA-400',     'active');
INSERT INTO items (storage_id, owner_id) VALUES (11, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 3, 'Hot Plate',           'Generic',  'HP-200',     'active');
INSERT INTO items (storage_id, owner_id) VALUES (11, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 3, 'PCB Drill',           'Dremel',   '3000',       'active');
INSERT INTO items (storage_id, owner_id) VALUES (11, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 3, 'Label Maker',         'Brother',  'PT-D210',    'active');
INSERT INTO items (storage_id, owner_id) VALUES (11, 1); INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 3, 'UPS',                 'APC',      'BX1500M',    'active');

-- Assets: Adapters (category_id = 4)
INSERT INTO items (storage_id, owner_id) VALUES (2, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 4, 'USB to UART',         'FTDI',     'FT232RL',    'active');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 4, 'USB to UART',         'CH340',    'CH340G',     'active');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 4, 'JTAG Debugger',       'Segger',   'J-Link EDU', 'active');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 4, 'SPI Flash Programmer','Generic',  'CH341A',     'active');
INSERT INTO items (storage_id, owner_id) VALUES (2, 1);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 4, 'Logic Level Shifter', 'SparkFun', 'BOB-12009',  'active');
INSERT INTO items (storage_id, owner_id) VALUES (2, 2);  INSERT INTO assets (item_id, asset_category_id, name, brand, model, status) VALUES (currval('items_id_seq'), 4, 'CAN Bus Adapter',     'Generic',  'MCP2515',    'active');

-- Materials
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Solder Wire 60/40 0.8mm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Solder Wire 63/37 0.5mm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Solder Paste');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Flux Pen');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Isopropyl Alcohol 99%');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'PCB Cleaner Spray');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Thermal Paste');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Kapton Tape');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Double Sided Tape');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Heat Shrink Tube 2mm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Heat Shrink Tube 4mm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Heat Shrink Tube 6mm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 2); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Jumper Wires M-M 20cm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 2); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Jumper Wires M-F 20cm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Copper Wire 0.5mm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Desoldering Braid');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'PCB Prototype Board');
INSERT INTO items (storage_id, owner_id) VALUES (12, 3); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Anti-static Bag');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'Cable Ties 100mm');
INSERT INTO items (storage_id, owner_id) VALUES (12, 1); INSERT INTO materials (item_id, name) VALUES (currval('items_id_seq'), 'M3 Screws Assortment');