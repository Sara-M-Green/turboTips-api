TRUNCATE departments, employees, employee_department, daily_tips RESTART IDENTITY CASCADE;

INSERT INTO departments (dept_name)
    VALUES
        ('BOH'),
        ('Prep'),
        ('Busser'),
        ('Barback'),
        ('Bartender');

INSERT INTO employees (emp_name)
    VALUES
        ('Back of House'),
        ('JT'),
        ('Fernanda G'),
        ('Fernanda T'),
        ('Estefania'),     
        ('Jesus'),
        ('Maddy'),
        ('Cam'),
        ('Josh'),
        ('Alec'),
        ('Steph'),
        ('Tucker'),
        ('Sara');

INSERT INTO employee_department (emp_id, dept_id)
    VALUES
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 3),
        (5, 3),
        (6, 3),
        (6, 4),
        (7, 4),
        (8, 4),
        (8, 5),
        (9, 5),
        (10, 5),
        (11, 5),
        (12, 5),
        (13, 5);


INSERT INTO daily_tips (tip_date, emp_id, bottles, tips)
VALUES
    (20200201, 1, 0, 78.85),
    (20200201, 2, 0, 54.25),
    (20200201, 3, 0, 88.85),
    (20200201, 4, 0, 90.56),
    (20200201, 6, 1, 98.89),
    (20200201, 9, 5, 154.62),
    (20200201, 10, 2, 178.52),
    (20200201, 12, 3, 165.23),


    (20200202, 1, 0, 198.87),
    (20200202, 2, 0, 101.01),
    (20200202, 5, 0, 175.52),
    (20200202, 6, 0, 85.63),
    (20200202, 8, 3, 101.01),
    (20200202, 11, 6, 201.63),
    (20200202, 12, 2, 187.89),
    (20200202, 13, 4, 187.89);
