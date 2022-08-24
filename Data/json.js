const PARAM_volume = [
    1,
    0.6,
    0.3,
    0
];

let JSON = {
    'volume': {
        'bg': 0.3,
        'fg': 0.6
    }
};

let level = 'Easy'
let money = 0;
let playerHealth = 100;
let enemyHealth = 100;

let ItemsShopMoney = [25, 30, 45];
let ItemsShopCapacity = [
    [2, 4, 5],
    [4, 3, 2],
    [2, 1, 4]
];
let itemsIsBuy = [false, false, false];
let itemsSelect = 0;

let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
