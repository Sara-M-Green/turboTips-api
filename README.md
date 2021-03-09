# Turbo Tips API

## Live Link

https://turbotips.vercel.app/

### Documentation
Turbo Tips API solicits two endpoints:
/employees & /tips.  

The 'Tip Calculator' page makes use of both endpoints.  

For each department with more than one employee, a GET request is made to the /employees/:dept_id endpoint. This request retrieves all employees from a specific department, and populates those employee names in the respective drop down menu.  
The 'Tip Calculator' sends a post request to /tips which contains a json object for each employee receiving tips in the format of tip_date, emp_id, bottles sold, and tips earned.  

The 'View Tips' page of the app also utilizes both endpoints. It populates the 'Select Employee' drop down with a GET request to /employees. This returns all employees in the database.  

'View Tips' also makes a GET request to /tips. This request returns all of the tip objects in an array, which is then filtered by selecting starting and ending dates and an employee's name. The filtered array is then displayed in a table created using React Table.  

### POSTGRESQL DATABASE
The database for Turbo Tips API is broken down into 4 tables.  
The departments table which is seeded into the app takes in the departments at Shelter Distilling and assigns each department an ID.  

The employees table which is also seeded into the app takes in each employee at Shelter Distilling and assigns each employee and ID.  

The employee_department table is comprised of an employee ID plus a department ID. Together these make up the primary key. This table is neccessary because some employees work in multiple departments.  

The daily_tips table is comprised of a tip date and an employee ID, together which make the primary key because a single employee will not receive tips more than once a day. The daily_tips table also stores bottles sold and tips.

![Table Relation Screen Shot](./src/images/table-relations.png?raw=true "View Tips")




<!-- ## How to run seeds on local db -->
<!-- psql -U Sara -d turboTips -f ./seeds/seed.tips.sql -->