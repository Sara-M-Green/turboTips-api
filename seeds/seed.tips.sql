TRUNCATE departments, employees, employee_department, daily_tips RESTART IDENTITY CASCADE;

INSERT INTO departments (dept_name)
    VALUES
        ('BOH'),
        ('Prep'),
        ('Busser'),
        ('Barback'),
        ('Bartender');

INSERT INTO employees (emp_name, emp_id)
    VALUES
        ('Back of House', 1),
        ('JT', 2),
        ('Fernanda G', 3),
        ('Fernanda T', 4),
        ('Estefania', 5),     
        ('Jesus', 6),
        ('Maddy', 7),
        ('Cam', 8),
        ('Josh', 9),
        ('Alec', 10),
        ('Steph', 11),
        ('Tucker', 12),
        ('Sara', 13);

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
    (20210301, 1, 0, 78.85),
    (20210301, 2, 0, 54.25),
    (20210301, 3, 0, 88.85),
    (20210301, 4, 0, 90.56),
    (20210301, 6, 1, 98.89),
    (20210301, 9, 5, 154.62),
    (20210301, 10, 2, 178.52),
    (20210301, 12, 3, 165.23),


    (20210302, 1, 0, 198.87),
    (20210302, 2, 0, 101.01),
    (20210302, 5, 0, 175.52),
    (20210302, 6, 0, 85.63),
    (20210302, 8, 3, 101.01),
    (20210302, 11, 6, 201.63),
    (20210302, 12, 2, 187.89),
    (20210302, 13, 4, 187.89),


    (20210303, 1, 0, 99.99),
    (20210303, 2, 0, 78.85),
    (20210303, 3, 0, 58.89),
    (20210303, 6, 0, 70.69),
    (20210303, 9, 4, 150.89),
    (20210303, 10, 9, 175.95),
    (20210303, 12, 2, 201.68),
    (20210303, 13, 4, 174.85);
