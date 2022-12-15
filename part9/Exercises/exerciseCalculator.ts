interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (hour: number, hours: Array<number>): Result => {

    let average = hours.reduce((prev, current) => prev + current ) / hours.length;
    let rating: number = 0;
    let description: string = "";

    if(average >= hour) {
        rating = 1;
        description = "goal achieved"
    }
    else if(average >= 1 && average <= hour){
        rating = 2;
        description = "not too bad but could be better"
    }
    else if(average < 1){
        rating = 3;
        description = "the target was not reached"
    }

    let result = {
        "periodLength": hours.length,
        "trainingDays": hours.filter((hour) => hour > 0).length,
        "success": (average >= hour),
        "rating": rating,
        "ratingDescription": description,
        "target": hour,
        "average": average,
    }
    return result
}

//console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
//console.log(calculateExercises(2, [1, 0, 2, 4.5, 0, 3, 1, 0, 4]))

/* try {
    const hour:number = Number(process.argv[2]);
    let hours: Array<number> = [];
    process.argv.forEach((val, index) => {
        if(index > 2) {
            hours.push(Number(val));
        }
    });

    console.log(calculateExercises(hour, hours))
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message)
} */