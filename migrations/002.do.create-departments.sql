--CREATE departments table (has no dependents)
CREATE TABLE departments (
  dept_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  dept_name TEXT NOT NULL
);

