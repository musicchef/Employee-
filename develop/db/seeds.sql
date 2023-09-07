INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 75000.00, 1),
  ('Sales Representative', 45000.00, 1),
  ('Marketing Manager', 70000.00, 2),
  ('Marketing Coordinator', 40000.00, 2),
  ('Finance Manager', 80000.00, 3),
  ('Financial Analyst', 55000.00, 3),
  ('Software Engineer', 90000.00, 4),
  ('Front-End Developer', 75000.00, 4),
  ('Back-End Developer', 80000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, NULL),
  ('Alice', 'Williams', 4, 3),
  ('Charlie', 'Brown', 5, NULL),
  ('Eve', 'Davis', 6, 5),
  ('David', 'Lee', 7, 5),
  ('Grace', 'Wilson', 8, 7),
  ('Oliver', 'Clark', 9, 7);