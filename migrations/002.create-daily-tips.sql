CREATE TABLE daily_tips (
    tip_date INTEGER NOT NULL,
    emp_id INTEGER REFERENCES employees(emp_id) NOT NULL,
    bottles INTEGER,
    tips INTEGER
)