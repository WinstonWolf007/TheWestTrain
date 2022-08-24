let begin = 0;

while (true) {

    let d = new Date();

    let time = d.getTime();

    console.log(time-begin);

    begin = time;
};


