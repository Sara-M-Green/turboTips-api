function makeEmployeeArray() {
    return [
        {
            emp_id: 1,
            emp_name: "Back of House"
        },
        {
            emp_id: 2,
            emp_name: "JT"
        },
        {
            emp_id: 3,
            emp_name: "Fernanda G"
        },
        {
            emp_id: 4,
            emp_name: "Fernanda T"
        },
        {
            emp_id: 5,
            emp_name: "Estefania"
        },
        {
            emp_id: 6,
            emp_name: "Jesus"
        },
        {
            emp_id: 7,
            emp_name: "Maddy"
        },
        {
            emp_id: 8,
            emp_name: "Cam"
        },
        {
            emp_id: 9,
            emp_name: "Josh"
        },
        {
            emp_id: 10,
            emp_name: "Alec"
        },
        {
            emp_id: 11,
            emp_name: "Steph"
        },
    ]
}

function makeDeptArray() {
    return [
        {
            dept_id: 1,
            dept_name: 'Boh'
        },
        {
            dept_id: 2,
            dept_name: 'Prep'
        },
        {
            dept_id: 3,
            dept_name: 'Busser'
        },
        {
            dept_id: 4,
            dept_name: 'Barback'
        },
        {
            dept_id: 5,
            dept_name: 'Bartender'
        },
    ]
}

function makeEmpDeptArray() {
    return [
        {
            emp_id: 1,
            dept_id: 1
        },
        {
            emp_id: 2,
            dept_id: 2
        },
        {
            emp_id: 3,
            dept_id: 3
        },
        {
            emp_id: 4,
            dept_id: 3
        },
        {
            emp_id: 5,
            dept_id: 3
        },
        {
            emp_id: 6,
            dept_id: 3
        },
        {
            emp_id: 6,
            dept_id: 4
        },
        {
            emp_id: 7,
            dept_id: 4
        },
        {
            emp_id: 8,
            dept_id: 4
        },
        {
            emp_id: 8,
            dept_id: 5
        },
        {
            emp_id: 9,
            dept_id: 5
        },
        {
            emp_id: 10,
            dept_id: 5
        },
        {
            emp_id: 11,
            dept_id: 5
        },
    ]
}

function makeTipsArray() {
    return [
        {
            tip_date: 20200201,
            emp_id: 1,
            bottles: 5,
            tips: 123.45
        },
        {
            tip_date: 20200201,
            emp_id: 2,
            bottles: 2,
            tips: 56.78
        },
        {
            tip_date: 20200202,
            emp_id: 2,
            bottles: 6,
            tips: 89.98
        },
        {
            tip_date: 20200202,
            emp_id: 3,
            bottles: 0,
            tips: 159.95
        },
    ]
}

function makeTipsResults() {
    return [
        {
            tip_date: 20200201,
            emp_name: 'Back of House',
            bottles: 5,
            tips: 123.45
        },
        {
            tip_date: 20200201,
            emp_name: 'JT',
            bottles: 2,
            tips: 56.78
        },
        {
            tip_date: 20200202,
            emp_name: 'JT',
            bottles: 6,
            tips: 89.98
        },
        {
            tip_date: 20200202,
            emp_name: 'Fernanda G',
            bottles: 0,
            tips: 159.95
        },
    ]
}

module.exports = {
    makeEmployeeArray,
    makeTipsArray,
    makeEmpDeptArray,
    makeDeptArray,
    makeTipsResults
}