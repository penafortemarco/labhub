INSERT INTO component_types (name, fields) VALUES
  ('resistor',  '{"value": "numeric", "package": "text", "tolerance": "text"}'),
  ('capacitor', '{"value": "numeric", "package": "text", "voltage": "numeric"}'),
  ('inductor',  '{"value": "numeric", "package": "text", "current": "numeric"}'),
  ('transistor', '{"subtype": "text", "package": "text", "vce": "numeric", "ic": "numeric"}')