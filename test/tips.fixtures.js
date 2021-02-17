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

module.exports = {
    makeTipsArray,
}