INSERT INTO departments (name)
VALUES
    ('Finance'),
    ('Legal'),
    ('Development'),
    ('Quality Assurance'),
    ('Support'),
    ('Administration');

INSERT INTO roles (title, salary, departmentId)
VALUES
    ('Accountant', 75000, 1),
    ('Book Keeper', 25000, 1),
    ('Lawyer', 100000, 2),
    ('Paralegal', 30000, 2),
    ('Developer Lead', 150000, 3),
    ('Front End Developer', 90000, 3),
    ('Back End Developer', 110000, 3),
    ('Testing Lead', 60000, 4),
    ('Tester', 10000, 4),
    ('Tech Support', 65000, 5),
    ('Assistant', 25000, 6),
    ('CEO', 100000, 6);

INSERT INTO employees (firstName,lastName,roleId)
VALUES
    ('Big', 'Boss', 12),
    ('Colby', 'Smoulders', 5),
    ('Pappy', 'Smith', 8);

INSERT INTO employees (firstName, lastName, roleId, managerId)
VALUES
    ('Tony', 'Tiger', 1, 1),
    ('Capn', 'Crunch', 2, 4),
    ('Rudy', 'Bologna', 3, 1),
    ('Betty', 'Boop', 4, 6),
    ('Bob', 'Lazard', 6, 2),
    ('Bill', 'Smithers', 6, 2),
    ('Leslie', 'Jones', 7, 2),
    ('Heppy', 'Daniels', 7, 2),
    ('Snuffy', 'Smith', 9, 3),
    ('Karl', 'Onit', 10, 3),
    ('Sally', 'Sunbags', 11, 1); 